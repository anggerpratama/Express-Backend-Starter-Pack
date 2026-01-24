export class StringFunction {
    
    public static IsEmpty = function(str: string | undefined | null) {
        return (str == undefined || str == null || str == "")
    }

    public static IsRealEmpty = function(str: string | undefined | null) {
        return (str == undefined || str == null || str == "" || str == "undefined" || str == "null")
    }

    public static IsRealNotEmpty = function(str: string | undefined | null) {
        return (str != undefined && str != null && str != "" && str != "undefined" && str != "null")
    }

    public static ParseToJSON = function(str: string | undefined | null) {
        try {
            return JSON.parse(str as string)
        } catch (error) {
            return null
        }
    }

    /**
     * Validates if a string is a valid UUID (v1-v5).
     * @param str - The string to validate as UUID.
     * @returns boolean - true if valid UUID, false otherwise.
     */
    public static IsUUID = function(str: string | undefined | null): boolean {
        if (typeof str !== "string") return false;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(str);
    }
    
    
}