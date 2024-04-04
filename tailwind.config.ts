import type { Config } from 'tailwindcss'
import tailwindcssSafeArea from 'tailwindcss-safe-area'

export default <Partial<Config>>{
  plugins: [tailwindcssSafeArea],
}
