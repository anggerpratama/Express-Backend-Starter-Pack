export const RealEscapeStringParam = function (val : string) : string {
    return val.replace(/[&\/\\#,+()$~%.'":;*?<>{}]/g, '')
}