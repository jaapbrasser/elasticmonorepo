import { ReactComponent as LocalLLMIcon } from 'images/local_llm_icon.svg'

export const Header = () => (
  <div className="flex flex-row justify-between space-x-6 px-8 py-3.5 bg-black/20 backdrop-blur-xl border-b border-white/10 w-full">
    <div className="pr-8 border-r border-white/20">
      <a href="/">
        <LocalLLMIcon width={118} height={40} />
      </a>
    </div>
  </div>
)
