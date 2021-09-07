import { EdkEvent, EdkHostEvent } from './event'
import EdkHost from './host'
export default class EdkIframeComponent {
    private host
    private id
    private options
    readonly url: string
    private static isInit
    private static isDebug
    private static clientId
    private readonly session
    private readonly $container
    private readonly $iframe
    private readonly eventListener
    private isHandShake
    private embedDomId
    private connectTimeout
    private iframeTargetOrigin
    constructor(
        host: EdkHost,
        id: string,
        options: {
            url: string
            eventListener: (event: EdkEvent) => void
            dom?: Element
        },
    )
    /**
     * 호스트 초기화, 세션 초기화
     */
    static init(options: { clientId: string; debug: boolean }): void
    /**
     * 서로 메시지 통신을 확인한다.
     * - 1초 동안 응답할때까지 메시지를 전송한다.
     * - 응답이 이루어지면 Promsie 종료
     * - connectTimeout을 초과하면 실패
     * - requireAuth 옵션이 있는 경우 토큰 전달하여 로그인한다.
     * - 연결이 완료되거나 실패하면 이벤트 리스너는 삭제된다.
     */
    handShakeListener(): Promise<void>
    /**
     * client 에게 이벤트 전송
     * @param data
     */
    sendEvent(data: EdkHostEvent): void
    /**
     * component 삭제하고 등록된 이벤트를 반환한다.
     */
    destroy(): void
    /**
     * em_embed 요소를 선택 안에 있는 모든 요소를 삭제하고 DOM을 반환한다.
     * @private
     */
    private selectElement
    /**
     * IFrame을 추가
     * @private
     */
    private appendIframe
    /**
     * event 전송
     * @private
     * @param data
     */
    private emitEvent
    /**
     * EDK 이벤트 리스너 생성 id로 필터링해서 받는다
     */
    private createEdkEventListener
    /**
     * 로그
     * @param key
     * @param data
     * @private
     */
    private logger
}
