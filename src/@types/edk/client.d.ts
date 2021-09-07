import { EdkHostEvent } from './event'
export default class EdkClient {
    static stage: 'prod' | 'dv' | 'local'
    private static isInit
    private static isDebug
    private static id
    private static clientId
    private static isEventListener
    info: {
        version: string
    }
    private session
    constructor()
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 호스트 초기화, 세션 초기화, 컨테이너 초기화
     */
    static init({ id, debug }: { id: string; debug: boolean }): void
    /**
     * Host handShake
     * @param event
     */
    handShake(event: EdkHostEvent): void
    /**
     * EDK Client 준비 완료
     */
    ready(): void
    /**
     * client 종료
     */
    close(): void
    /**
     * host에 이벤트 전달
     * @param event
     * @private
     */
    private send
    /**
     * 로그
     * @param key
     * @param data
     * @private
     */
    private logger
}
