import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import autosize from 'autosize'
import { cn } from 'lib/utils'
import Conversation from 'images/conversation'
import { ReactComponent as SendIcon } from 'images/paper_airplane_icon.svg'
import { ReactComponent as StopIcon } from 'images/stop_icon.svg'

export default function ChatInput({
  isMessageLoading,
  onSubmit,
  onAbortRequest,
}) {
  const [message, setMessage] = useState<string>()
  const textareaReference = useRef<HTMLTextAreaElement>(null)
  const isSubmitDisabled =
    !message || message.trim().length === 0 || isMessageLoading

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (!isSubmitDisabled) {
      onSubmit(message)

      setMessage('')
      autosize(textareaReference.current)
    }
  }
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    autosize(textareaReference.current)
    setMessage(event.target.value)
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  useLayoutEffect(() => {
    const ref = textareaReference?.current

    ref?.focus()
    autosize(ref)

    return () => {
      autosize.destroy(ref)
    }
  }, [])

  return (
    <form
      className="flex relative space-x-2 items-center gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        className="disabled:border-white/30 disabled:opacity-75 h-14 w-full px-2 py-3.5 pr-20 border-2 rounded-xl bg-white/10 backdrop-blur-md border-white/30 text-white placeholder-slate-400 leading-9 focus:bg-white/20 pl-9 flex items-center resize-none"
        ref={textareaReference}
        value={message}
        placeholder="Ask a follow up question"
        onKeyDown={handleKeyDown}
        onChange={onChange}
        disabled={isMessageLoading}
      ></textarea>
      <span className="absolute left-2 top-5">
        <Conversation />
      </span>
      {isMessageLoading ? (
        <button
          onClick={onAbortRequest}
          className="hover:bg-red-500/80 bg-red-500/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 cursor-pointer text-white animate-pulse hover:animate-pulse-stop self-end absolute right-2 bottom-2"
        >
          <StopIcon width={24} height={24} />
        </button>
      ) : (
        <button
          disabled={isSubmitDisabled}
          type="submit"
          className="enabled:hover:bg-blue-500/80 disabled:opacity-50 bg-blue-500/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 disabled:cursor-not-allowed cursor-pointer self-end absolute right-2 bottom-2"
        >
          <SendIcon width={24} height={24} />
        </button>
      )}
    </form>
  )
}
