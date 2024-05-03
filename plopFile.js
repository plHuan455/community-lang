/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
const FILE_PATHS = {
  en: "langs/en.json",
  ko: "langs/ko.json",
  vi: "langs/vi.json",
  th: "langs/th.json",
  zhCn: "langs/zh-cn.json",
  zhTw: "langs/zh-tw.json",
}

const SVG_FOLDER = "components/svg"

const updateFileValue = (path, { key, value }) => {
  const fileData = JSON.parse(fs.readFileSync(path, "utf-8") || "{}")
  fileData[key] = value
  fs.writeFileSync(path, JSON.stringify(Object.fromEntries(Object.entries(fileData).sort()), null, 2))
}

const deleteProperty = (path, key) => {
  const fileData = JSON.parse(fs.readFileSync(path, "utf-8") || "{}")
  delete fileData[key]
  fs.writeFileSync(path, JSON.stringify(Object.fromEntries(Object.entries(fileData).sort()), null, 2))
}


module.exports = function (plop) {
  plop.setGenerator("CHANGE LANG", {
    description: "CREATE, UPDATE, DELETE LANG",
    prompts: [
      {
        type: "input",
        name: "key",
        message: "key",
      },
    ],
    actions: [
      function (data) {
        const { key } = data
        updateFileValue(FILE_PATHS.en, { key: key, value: "" })
        updateFileValue(FILE_PATHS.ko, { key: key, value: "" })
        updateFileValue(FILE_PATHS.vi, { key: key, value: "" })
        updateFileValue(FILE_PATHS.th, { key: key, value: "" })
        updateFileValue(FILE_PATHS.zhCn, { key: key, value: "" })
        updateFileValue(FILE_PATHS.zhTw, { key: key, value: "" })
        return "LANGUAGE FILES HAS BEEN UPDATED!"
      },
    ],
  }),
  plop.setGenerator("DELETE LANG", {
    description: "CREATE, UPDATE, DELETE LANG",
    prompts: [
      {
        type: "input",
        name: "key",
        message: "key",
      },
    ],
    actions: [
      function (data) {
        const { key } = data
        Object.values(FILE_PATHS).forEach(value => {
          deleteProperty(value, key)
        })
        return "LANGUAGE FILES HAS BEEN DELETED!"
      },
    ],
  })
}
