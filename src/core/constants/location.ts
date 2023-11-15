import { browser } from '$app/environment'

export const origin = browser ? window.location.origin : 'http://localhost:5173'
