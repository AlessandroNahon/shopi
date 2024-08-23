import { pageDataAtom, templateAtom } from 'atoms'
import { useAtom, useAtomValue } from 'jotai'
import { type ReactElement } from 'react'
import Picker from '../Picker'

export default function SideNav(): ReactElement {
	const template = useAtomValue(templateAtom)
	const [pageData, setData] = useAtom(pageDataAtom)

	function onInputChange(e, atom) {
		e.preventDefault()
		setData((prevData) => ({
			...prevData,
			[atom]: e.target.value,
		}))
	}
	return (
		<div className='relative p-2'>
			<Picker />
			{template.map((section) => {
				const components = section.components

				return (
					<div
						key={section.name}
						className='flex flex-col border-b-[1px] pb-8 mb-8'
					>
						<h2 className='mb-2 text-xl'>{section.name}</h2>
						<div>
							{components.map((component) => {
								const existingValue = pageData[component.atom]
								return (
									<div className='flex flex-col px-2' key={component.name}>
										<label className='mb-2'>{component.name}:</label>
										<input
											className='bg-transparent mb-2 p-2 border-2 border-white rounded-sm'
											defaultValue={existingValue ?? component.defaultValue}
											type={component.type}
											onChange={(e) => onInputChange(e, component.atom)}
										/>
									</div>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}
