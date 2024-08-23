import { lazy } from 'react'

const Hero = lazy(() => import('~/components/lib/Hero'))
const Conversion = lazy(() => import('~/components/lib/Hero/Conversion'))

export default function useSections() {
	function getSection(s, d) {
		switch (s.name) {
			case 'Hero':
				return <Hero title={d.heroTitleAtom} kicker={d.heroKickerAtom} />
			case 'Conversion':
				return (
					<Conversion
						title={d.conversionTitleAtom}
						buttonText={d.conversionButtonAtom}
					/>
				)
			default:
				return null
		}
	}

	return getSection
}
