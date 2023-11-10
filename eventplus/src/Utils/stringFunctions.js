export const dateFormatDbToView = data => {
    data = data.substr(0,10).split("-")
    return (`${data[2]}/${data[1]}/${data[0]}`)
}