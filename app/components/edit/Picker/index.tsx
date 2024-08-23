import { sectionsAtom, templateAtom } from 'atoms'
import { useAtom, useAtomValue } from 'jotai'
import { useState, type ReactElement } from 'react'

export default function Picker(): ReactElement {
	const [open, setOpen] = useState(false)
	const sections = useAtomValue(sectionsAtom)
	const [template, setTemplate] = useAtom(templateAtom)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const tmp = []
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, value] of formData.entries()) {
			tmp.push(sections.find((s) => s.name === value))
		}
		setTemplate(tmp)
	}

	const handleCheckboxChange = (sectionName: string) => {
		setTemplate((prevTemplate) => {
			if (prevTemplate.some((section) => section.name === sectionName)) {
				// If the section is already in the template, remove it
				return prevTemplate
					.filter((section) => section.name !== sectionName)
					.sort((a, b) => a.order - b.order)
			} else {
				// If the section is not in the template, add it
				const sectionToAdd = sections.find((s) => s.name === sectionName)
				return sectionToAdd
					? [...prevTemplate, sectionToAdd].sort((a, b) => a.order - b.order)
					: prevTemplate
			}
		})
	}

	return (
		<div className='grid'>
			<button
				className='active:border-white active:text-white hover:border-slate-400 hover:text-slate-400  p-2 rounded border-2 border-white duration-200 justify-self-end'
				onClick={() => setOpen(!open)}
			>
				Browse Sections
				<div className='inline-block transform scale-y-50 pl-2'>
					{open ? '/\\' : '\\/'}
				</div>
			</button>
			{open && (
				<form
					onSubmit={handleSubmit}
					className='grid grid-rows-2 gap-y-4 absolute right-2 top-14 bg-stone-900 border-white border-[1px] rounded w-60 h-60 p-2 shadow-[0_10px_25px_rgba(8,_112,_184,_0.7)]'
				>
					<div>
						{sections.map((s) => (
							<div className='w-full py-1 hover:text-slate-400 ' key={s.name}>
								<label className='cursor-pointer w-full flex'>
									<input
										checked={template.some((t) => t.name === s.name)}
										onChange={() => handleCheckboxChange(s.name)}
										type='checkbox'
										className='relative bottom-[-2px] last:appearance-none w-5 h-5 bg-transparent checked:bg-green-600 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600'
										name={s.type}
										value={s.name}
									/>
									<p className='pl-2 inline-block w-full'>{s.name}</p>
								</label>
							</div>
						))}
					</div>

					{/* <div className='justify-self-center content-end'>
						<button className='transition-all duration-100 hover:text-green-400 hover:drop-shadow-xl hover:scale-[1.006]'>
							<span className='pr-2'>+</span>
							Add Section
						</button>
					</div> */}
				</form>
			)}
		</div>
	)
}
