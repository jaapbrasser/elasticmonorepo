import React from 'react'
import { ChatMessageType, SourceType } from 'types'
import { Loader } from 'components/loader'
import { Sources } from 'components/chat/sources'
import { ReactComponent as UserLogo } from 'images/user.svg'
import { ReactComponent as LocalLLMIcon } from 'images/local_llm_icon.svg'

type ChatMessageProps = Omit<ChatMessageType, 'id'> & {
  onSourceClick: (source: string) => void
}
export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isHuman,
  sources,
  loading,
  onSourceClick,
}) => {
  const messageIcon = isHuman ? (
    <span className="self-end p-2 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm">
      <UserLogo width={24} height={24} />
    </span>
  ) : (
    <span className="self-end p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm shadow-lg border border-white/20">
      <LocalLLMIcon width={24} height={24} />
    </span>
  )

  return (
    <div>
      <div className={`flex mt-6 gap-2 ${isHuman ? 'justify-end' : ''}`}>
        {messageIcon}

        <div
          className={`w-96 p-4 rounded-xl backdrop-blur-md shadow-2xl border border-white/20 ${
            isHuman
              ? 'rounded-br-none text-white bg-blue-500/80 -order-1'
              : 'bg-white/10 rounded-bl-none text-slate-200'
          }`}
        >
          <span
            className="whitespace-pre-wrap leading-normal"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          ></span>
          {loading && <Loader />}
        </div>
      </div>
      {!!sources?.length && (
        <div className="mt-6 gap-2 inline-flex">
          {messageIcon}
          <Sources sources={sources || []} onSourceClick={onSourceClick} />
        </div>
      )}
    </div>
  )
}
