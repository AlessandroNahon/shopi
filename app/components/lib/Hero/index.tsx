import { type ReactElement } from 'react'

type Props = {
	title: any
	kicker: any
	description?: any
}
export default function Hero(props: Props): ReactElement {
	return (
		<section className='h-80 bg-emerald-950 grid grid-cols-[2fr_1fr] grid-rows-1 gap-4'>
			<div className='p-20'>
				<span className='text-sm'>{props.kicker}</span>
				<h1 className='text-3xl'>{props.title}</h1>
				<p>{props.description}</p>
			</div>
		</section>
	)
}
