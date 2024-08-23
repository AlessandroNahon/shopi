import { pageDataAtom, sectionsAtom, templateAtom } from 'atoms'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useState, type ReactElement } from 'react'

export default function Picker(): ReactElement {
	const [open, setOpen] = useState(false)
	const sections = useAtomValue(sectionsAtom)
	const [template, setTemplate] = useAtom(templateAtom)
	const setPageData = useSetAtom(pageDataAtom)

	const handleCheckboxChange = (sectionName: string) => {
		setTemplate((prevTemplate) => {
			const isSectionInTemplate = prevTemplate.some(
				(section) => section.name === sectionName
			)

			if (isSectionInTemplate) {
				// Remove the section from the template and reset the data
				const updatedTemplate = prevTemplate.filter(
					(section) => section.name !== sectionName
				)

				resetPageData(sectionName)
				return sortTemplate(updatedTemplate)
			} else {
				// Add the section to the template
				const sectionToAdd = sections.find((s) => s.name === sectionName)

				return sectionToAdd
					? sortTemplate([...prevTemplate, sectionToAdd])
					: prevTemplate
			}
		})
	}

	const resetPageData = (sectionName: string) => {
		setPageData((prevPageData) => {
			const newPageData = { ...prevPageData }
			const section = sections.find((s) => s.name === sectionName)

			if (section) {
				section.components.forEach((component) => {
					if (component.atom in newPageData) {
						newPageData[component.atom] = component.defaultValue
					}
				})
			}

			return newPageData
		})
	}

	const sortTemplate = (template) => template.sort((a, b) => a.order - b.order)

	return (
		<div className='grid'>
			<button
				className='active:border-white active:text-white hover:border-slate-400 hover:text-slate-400 p-2 rounded border-2 border-white duration-200 justify-self-end'
				onClick={() => setOpen(!open)}
			>
				Browse Sections
				<div className='inline-block transform scale-y-50 pl-2'>
					{open ? '/\\' : '\\/'}
				</div>
			</button>
			{open && (
				<form className='absolute right-2 top-14 bg-stone-900 border-white border-[1px] rounded w-60 h-60 p-2 shadow-[0_10px_25px_rgba(8,_112,_184,_0.7)]'>
					{sections.map((s) => (
						<div className='w-full py-1 hover:text-slate-400' key={s.name}>
							<label className='cursor-pointer w-full flex'>
								<input
									checked={template.some((t) => t.name === s.name)}
									onChange={() => handleCheckboxChange(s.name)}
									type='checkbox'
									className='relative bottom-[-2px] last:appearance-none w-5 h-5 bg-transparent checked:bg-green-600 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600'
									value={s.name}
								/>
								<p className='pl-2 inline-block w-full'>{s.name}</p>
							</label>
						</div>
					))}
				</form>
			)}
		</div>
	)
}
