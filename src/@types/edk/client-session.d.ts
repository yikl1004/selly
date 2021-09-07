export interface EdkClientSessionInfo {
    syncId: string
    name: string
    email: string
    avatarUrl: string
    syncToken: string
    syncTokenExpiredAt: Date
    accessToken?: string
    accessTokenExpiredAt?: Date
    refreshToken?: string
    refreshTokenExpiredAt?: Date
}
export default class EdkHostSession {
    static isInit: boolean
    private static stage
    private static isDebug
    private readonly stageKey
    private readonly storageKey
    private readonly storageSessionKey
    private readonly storage
    constructor(storage: Storage)
    static init(options: { stage: string; debug: boolean }): void
    /**
     * 세션 추가
     */
    addSession(session: EdkClientSessionInfo): void
    /**
     * 세션 업데이트
     */
    updateSession(session: EdkClientSessionInfo): null | undefined
    /**
     * 세션 정보
     */
    getSession(): EdkClientSessionInfo | null
    /**
     * 세션 삭제
     */
    removeSession(): void
    /**
     * 세션 비우기
     */
    reset(): void
    /**
     * 로그
     * @param key
     * @param data
     * @private
     */
    private logger
}
