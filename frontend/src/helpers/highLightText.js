// Text highlight when the search student details
export const highlightText = (text, querys) => {
    const query = querys?.toString().trim();

    if (!text || !query) return text;

    const str = text.toString(); // 🔥 Ensure it's a string

    const regex = new RegExp(`(${query})`, "gi");

    return str.replace(
      regex,
      `<span class="bg-yellow-200 dark:bg-yellow-500">$1</span>`
    );
  };
