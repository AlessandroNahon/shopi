import { useLoaderData } from '@remix-run/react'
import { pageDataAtom, sectionsAtom } from 'atoms'
import { useAtom, useSetAtom } from 'jotai'

import { useEffect, type ReactElement } from 'react'
import Preview from '~/components/edit/Preview'
import SideNav from '~/components/edit/SideNav'
import { getSections } from '~/utils/sections'

export function loader() {
	return {
		sections: getSections(),
	}
}

export default function Edit(): ReactElement {
	const data = useLoaderData()
	const setSections = useSetAtom(sectionsAtom)
	const [pageData, setPageData] = useAtom(pageDataAtom)

	useEffect(() => {
		const newPageData = {}

		data.sections.forEach((s) => {
			const cmp = JSON.parse(s)
			cmp.components.forEach((c) => {
				// Only set the default value if there is no existing value
				if (!(c.atom in pageData)) {
					newPageData[c.atom] = c.defaultValue
				}
			})
		})

		setPageData((prevPageData) => ({
			...prevPageData,
			...newPageData,
		}))
	}, [setPageData, data.sections])

	useEffect(() => {
		setSections(
			data.sections
				.map((c, i) => {
					const comp = JSON.parse(c)
					if (comp.name === 'Hero') {
						return { ...comp, order: 0 }
					}
					return { ...comp, order: i + 1 }
				})
				.sort((a, b) => a.order - b.order)
		)
	}, [setSections, data.sections])

	return (
		<main>
			<div className='h-screen grid grid-cols-[2fr_1fr] grid-rows-1 gap-0'>
				<Preview />
				<SideNav />
			</div>
		</main>
	)
}
