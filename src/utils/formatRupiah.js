export const formatRupiah = (nominal) => {
  const result = nominal?.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return result;
};
