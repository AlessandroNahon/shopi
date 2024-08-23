// app/atoms.ts

import { atomWithStorage } from 'jotai/utils'

const initialState = {
	heroTitleAtom: '',
	heroKickerAtom: '',
	conversionTitleAtom: '',
	conversionButtonAtom: '',
}

export const pageDataAtom = atomWithStorage('pageData', initialState)

export const sectionsAtom = atomWithStorage('sections', [])

export const templateAtom = atomWithStorage('template', [])
