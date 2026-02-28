import LogEntry from './entry.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import parseHTML from '../utilities/parse-html.ts'
import { UUIDS } from '../settings.ts'

const readLog = async (): Promise<LogEntry[]> => {
  const journal = await fromUuid(UUIDS.LOG) as JournalEntry | null
  if (!journal) return []

  const entries: LogEntry[] = []
  const pages = journal.pages.map(page => parseHTML(page.text.content))

  for (const page of pages) {
    const lists = [...page.querySelectorAll('dl')]
    for (const list of lists) {
      const dts = [...list.querySelectorAll('dt')]
      for (const dt of dts) {
        const dds: HTMLDListElement[] = []
        let sibling = dt.nextElementSibling
        while (sibling && sibling?.tagName === 'DD') {
          dds.push(sibling as HTMLDListElement)
          sibling = sibling.nextElementSibling
        }

        const dthtml = dt.outerHTML
        const ddhtml = dds.map(dd => dd.outerHTML).join('')
        const entry = LogEntry.parse(dthtml + ddhtml)
        if (entry) entries.push(entry)
      }
    }
  }

  return entries
}

export default readLog
