import { Sources } from './sources'
import { ChatMessageType } from '../../types'

interface AnswerMessageProps {
  text: ChatMessageType['content']
  sources: ChatMessageType['sources']
  onSourceClick: (source: string) => void
}

export const AnswerMessage: React.FC<AnswerMessageProps> = ({
  text,
  sources,
  onSourceClick,
}) => {
  return (
    <div className="mb-4">
      <header className="flex flex-row justify-between mb-8">
        <div className="flex flex-row justify-center align-middle items-center">
          <div className="flex flex-col justify-start">
            <h2 className="text-white text-2xl font-bold leading-9">
              Answer
            </h2>
            <p className="text-slate-300 text-sm font-medium">
              Powered by <b>Local LLM</b>
            </p>
          </div>
        </div>
      </header>

      {text && (
        <div
          className="text-base leading-tight text-slate-200 whitespace-pre-wrap mb-8"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      )}
      {sources && (
        <Sources
          showDisclaimer
          sources={sources}
          onSourceClick={onSourceClick}
        />
      )}
    </div>
  )
}
