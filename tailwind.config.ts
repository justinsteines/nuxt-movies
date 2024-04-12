import type { Config } from 'tailwindcss'
import tailwindcssSafeArea from 'tailwindcss-safe-area'
import headlessUi from '@headlessui/tailwindcss'

export default <Partial<Config>>{
  plugins: [tailwindcssSafeArea, headlessUi],
  safelist: [
    ...[...Array(7)].flatMap((_, i) => [
      `basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `sm:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `md:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `lg:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `xl:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `2xl:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
    ]),
  ],
}
