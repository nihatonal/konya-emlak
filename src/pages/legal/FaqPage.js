import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import usePageMeta from '../../hooks/usePageMeta'

const FaqAccordion = () => {
  const { t } = useTranslation()
  const faqList = t('faq.questions', { returnObjects: true })
  const [openIndex, setOpenIndex] = useState(null)
  const contentRefs = useRef([])
  
  usePageMeta(
    t('meta.faq.title'),
    t('meta.faq.description')
  );
  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, faqList.length)
  }, [faqList.length])

  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">{t('faq.title')}</h1>
      <div className="space-y-4">
        {faqList.map((item, index) => (
          <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full bg-bvs-softGreen flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-900">{item.q}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight: openIndex === index
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : '0px',
              }}
              className="overflow-hidden transition-all duration-500 ease-in-out px-4"
            >
              <div className="py-3 text-gray-700">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FaqAccordion
