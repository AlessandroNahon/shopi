import { type ReactElement } from 'react'

type Props = {
	title: any
	buttonText: any
}

export default function Conversion(props: Props): ReactElement {
	return (
		<section className='h-80 text-black bg-white grid grid-cols-1 grid-rows-1 gap-0 justify-items-center items-center'>
			<div className='text-center'>
				<h2>{props.title}</h2>
				<button className='p-2 border-2 rounded mt-4'>
					{props.buttonText}
				</button>
			</div>
		</section>
	)
}
