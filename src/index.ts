import clone from "@/infrastructure/repository/clone";

(() => {
  clone("https://github.com/kazuhe/kazuhe", "~/Desktop/gitmemo/")
    .then((result) => {
      console.log("成功", result);
    })
    .catch((error) => {
      console.log("失敗", error);
    });
})();
