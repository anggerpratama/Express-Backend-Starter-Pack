# Database Docs


### Migrations Scripts & Guide
npm run migration:generate -- --name=CreateSomethingTable
```

Where:
- `npm run migration:generate` - runs your npm script
- `--` - tells npm to pass everything after this to the script
- `--name=CreateSomethingTable` - your custom argument

This will generate a migration file at:
```
src/infrastructure/database/migrations/CreateSomethingTable-[timestamp].ts

### Seeder Script & Guide