declare global {
    interface Window {
        $edkHost: EmentalEDK['Host']
        edk: EmentalEDK
    }
}
export {}
