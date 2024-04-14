/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
const FILE_PATHS = {
  en: "en.json",
  ko: "ko.json",
  vi: "vi.json",
  th: "th.json",
  zhCn: "zh-cn.json",
  zhTw: "zh-tw.json",
}

const SVG_FOLDER = "components/svg"

const updateFileValue = (path, { key, value }) => {
  const fileData = JSON.parse(fs.readFileSync(path, "utf-8") || "{}")
  fileData[key] = value
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
  })
}
