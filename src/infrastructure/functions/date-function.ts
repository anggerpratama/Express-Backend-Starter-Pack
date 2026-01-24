
export class DateFunction {
    
    public static AddDays = function(date : Date , days : number) {
        let result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    public static toYYYYmmddFormat = function(date: Date | undefined) {
        if (date == undefined) return ''
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2 , '0')}-${date.getDate().toString().padStart(2 , '0')}`
    }

    public static isValidDate(date: any) {
        const timestamp = Date.parse(date)
        return !isNaN(timestamp)
    }
}