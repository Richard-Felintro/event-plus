function notifier(type, textNote, notificationFunction) {
  type.toLowerCase();

  let titleNote =
    type === "success" ? "Sucesso" : type === "error" ? "Erro" : "Aviso";

  let imgIcon =
    type === "success" ? "sucess" : type === "error" ? "error" : "warning";

  let ImgAlt =
    type === "success"
      ? "Imagem de confirmação de OK"
      : type === "error"
      ? "Imagem de erro"
      : "Imagem de erro";

  return notificationFunction({
    titleNote: titleNote,
    textNote: textNote,
    imgIcon: imgIcon,
    imgAlt: ImgAlt,
    showMessage: true,
  });
}
