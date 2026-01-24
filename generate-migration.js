const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the --name argument
const args = process.argv.slice(2);
const nameArg = args.find(arg => arg.startsWith('--name='));

if (!nameArg) {
  console.error('Error: Please provide a migration name using --name=YourMigrationName');
  process.exit(1);
}

const migrationName = nameArg.split('=')[1];

if (!migrationName) {
  console.error('Error: Migration name cannot be empty');
  process.exit(1);
}

// Build and execute the command
const command = `npm run typeorm migration:generate src/database/migrations/${migrationName} -- -d src/database/data-source.ts`;

console.log(`Running: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
  
  // Find the generated migration file
  const migrationsDir = path.join(__dirname, 'src', 'database', 'migrations');
  const files = fs.readdirSync(migrationsDir);
  
  // Find the file that matches the migration name pattern (timestamp-MigrationName.ts)
  const migrationFile = files.find(file => 
    file.endsWith('.ts') && 
    file.includes(migrationName) &&
    /^\d+-/.test(file) // Starts with timestamp
  );
  
  if (!migrationFile) {
    console.error('Error: Could not find generated migration file');
    process.exit(1);
  }
  
  // Read the migration file to extract the class name
  const migrationFilePath = path.join(migrationsDir, migrationFile);
  const migrationContent = fs.readFileSync(migrationFilePath, 'utf8');
  
  // Extract class name from: export class ClassName implements MigrationInterface
  const classMatch = migrationContent.match(/export class (\w+) implements MigrationInterface/);
  
  if (!classMatch) {
    console.error('Error: Could not extract class name from migration file');
    process.exit(1);
  }
  
  const className = classMatch[1];
  const fileNameWithoutExt = migrationFile.replace('.ts', '');
  
  console.log(`Found migration class: ${className}`);
  
  // Read init.migration.ts
  const initMigrationPath = path.join(migrationsDir, 'init.migration.ts');
  let initContent = fs.readFileSync(initMigrationPath, 'utf8');
  
  // Check if import already exists
  const importPattern = new RegExp(`import.*${className}.*from`, 'g');
  if (importPattern.test(initContent)) {
    console.log('Migration already registered in init.migration.ts');
    process.exit(0);
  }
  
  // Add import statement after the last import
  const importLines = initContent.match(/^import .*$/gm) || [];
  if (importLines.length > 0) {
    const lastImportLine = importLines[importLines.length - 1];
    const newImport = `import { ${className} } from "./${fileNameWithoutExt}";`;
    initContent = initContent.replace(lastImportLine, lastImportLine + '\n' + newImport);
  } else {
    // If no imports found, add at the beginning
    const newImport = `import { ${className} } from "./${fileNameWithoutExt}";\n\n`;
    initContent = newImport + initContent;
  }
  
  // Add class to migrations array
  // Find the migrations array and add the new class
  const migrationsArrayRegex = /(migrations:\s*\[)([\s\S]*?)(\])/;
  const migrationsMatch = initContent.match(migrationsArrayRegex);
  
  if (migrationsMatch) {
    const existingMigrations = migrationsMatch[2].trim();
    const indent = '        '; // 8 spaces to match existing format
    
    // Extract existing migration classes (they're on separate lines)
    const existingMigrationClasses = existingMigrations
      .split('\n')
      .map(line => line.trim().replace(/,$/, ''))
      .filter(line => line.length > 0);
    
    // Add the new class
    existingMigrationClasses.push(className);
    
    // Rebuild the migrations array with proper formatting
    const migrationsArrayContent = existingMigrationClasses
      .map((cls, index) => {
        const comma = index < existingMigrationClasses.length - 1 ? ',' : '';
        return `${indent}${cls}${comma}`;
      })
      .join('\n');
    
    const newMigrationsArray = `${migrationsMatch[1]}\n${migrationsArrayContent}\n${indent}${migrationsMatch[3]}`;
    initContent = initContent.replace(migrationsArrayRegex, newMigrationsArray);
  }
  
  // Write updated content back
  fs.writeFileSync(initMigrationPath, initContent, 'utf8');
  
  console.log(`Successfully added ${className} to init.migration.ts`);
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}