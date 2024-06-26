/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */


(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    const updateLogo = theme => {
        const logoImage = document.getElementById("logo_image")
        if (theme === 'dark') {
            logoImage.src = '/assets/images/logos/pactus-logo-dark.png'
        } else {
            logoImage.src = '/assets/images/logos/pactus-logo-light.png'
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {

        if (theme === "dark") {
            document.getElementById("dark").classList.add("d-none")
            document.getElementById("light").classList.remove("d-none")
        } else {
            document.getElementById("light").classList.add("d-none")
            document.getElementById("dark").classList.remove("d-none")
        }
        
        const themeSwitcher = document.querySelector('#bd-theme')

        if (!themeSwitcher) {
            return
        }

        const themeSwitcherText = document.querySelector('#bd-theme-icon')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        const activeFAClasses = btnToActive.querySelector('i').classList.value

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.setAttribute('aria-pressed', 'false')
        })

        btnToActive.setAttribute('aria-pressed', 'true')
        themeSwitcherText.classList.value = activeFAClasses

        if (focus) {
            themeSwitcher.focus()
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {

        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                
                toggle.addEventListener('click', () => {
                    
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    if (theme === "dark") {
                        document.getElementById("dark").classList.add("d-none")
                        document.getElementById("light").classList.remove("d-none")
                    } else {
                        document.getElementById("light").classList.add("d-none")
                        document.getElementById("dark").classList.remove("d-none")
                    }
                    setStoredTheme(theme)
                    setTheme(theme)
                    // updateLogo(theme)
                    showActiveTheme(theme, true)
                })
            })
    })
})()