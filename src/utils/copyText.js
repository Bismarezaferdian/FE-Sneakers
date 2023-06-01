export const copyTextButton = ({ text }) => {
  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Teks berhasil disalin");
      })
      .catch((error) => {
        console.log("Gagal menyalin teks:", error);
      });
  };
  return copyText;
};
