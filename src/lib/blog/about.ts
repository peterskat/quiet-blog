import type { Locale } from "@/lib/blog/config";

/** Independent about copy per branch — not translations of one another. */
export const aboutByLocale: Record<Locale, { title: string; paragraphs: string[] }> = {
  en: {
    title: "About",
    paragraphs: [
      "I write to understand the interior of ordinary days: the rituals of home, the language of beauty, and the way attention can make even small moments feel luminous.",
      "This space is a notebook for reflections on motherhood, culture, and personal style — and a place to practice slower thinking in a louder world.",
      "If you are here, welcome. I hope these pages feel like a calm room with warm light and a chair by the window."
    ]
  },
  cs: {
    title: "O mně",
    paragraphs: [
      "Tento kout je místo pro krátké texty o všedních dnech, blízkých věcech a tom, co právě držím v rukou.",
      "Nejde o překlad jiné verze — jen o český zápis toho, co zrovna potřebuje slova."
    ]
  },
  vi: {
    title: "Giới thiệu",
    paragraphs: [
      "Đây là góc nhỏ để ghi lại những điều gần gũi: nhà, khoảng lặng, và những điều tưởng nhỏ nhưng đủ sâu.",
      "Mỗi ngôn ngữ ở đây là một nhánh riêng — không phải bản dịch, mà là một giọng khác của cùng một sự chân thành."
    ]
  }
};
