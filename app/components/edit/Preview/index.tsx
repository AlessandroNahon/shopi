import { pageDataAtom, templateAtom } from 'atoms'
import { useAtomValue } from 'jotai'
import { Suspense, type ReactElement } from 'react'
import useSections from '~/hooks/useSections'

export default function Preview(): ReactElement {
	const template = useAtomValue(templateAtom)
	const data = useAtomValue(pageDataAtom)
	const getSection = useSections()

	function render(t, data) {
		return t.map((s) => getSection(s, data))
	}

	return (
		<div className='w-full h-full border-2 border-gray-900 bg-gray-300 justify-self-stretch'>
			<Suspense fallback={<h1>Loading...</h1>}>
				{render(template, data)}
			</Suspense>
		</div>
	)
}
