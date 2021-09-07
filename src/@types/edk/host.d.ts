import { EdkEventListener } from './event'
import EdkHostSession from './host-session'
import EdkIframeComponent from './iframe-component'
declare type EdkOptions = {
    clientId: string
    stage?: EdkStage
    originStages?: EdkDetailStage
    debug?: boolean
}
declare type EdkStage = 'prod' | 'dv' | 'local'
declare type EmbedTarget =
    | 'authBznavApi'
    | 'ssoBznavWebApp'
    | 'locaBznavWebApp'
    | 'embedBznavWebApp'
    | 'insightBznavWebApp'
    | 'insightReportBznavWebApp'
declare type EdkDetailStage = {
    [target in EmbedTarget]: EdkStage
}
declare type EdkOrigin = {
    [target in EmbedTarget]: string
}
export default class EdkHost {
    private static isInit
    private static stage
    private static originStages
    private static origins
    private static isDebug
    private static clientId
    info: {
        version: string
    }
    activeIframeUrl: string
    session: EdkHostSession
    constructor()
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 호스트 초기화, 세션 초기화, 컨테이너 초기화
     */
    static init({ clientId, stage, originStages, debug }: EdkOptions): void
    /**
     * stage 에따른 origin 정보 획득
     * @param originStages
     */
    static getOrigins(originStages: EdkDetailStage): EdkOrigin
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 비즈넵 로그인
     * @param dom
     * @param bznavSyncToken
     */
    signInBznav({ dom, bznavSyncToken }: { dom?: Element; bznavSyncToken: string }): Promise<void>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 비즈넵 회원가입
     * @param args
     */
    signUpBznav({ dom, bznavSyncToken }: { dom?: Element; bznavSyncToken: string }): Promise<void>
    /**
     * 비즈넵 로그아웃
     * @param args
     */
    signOutBznav({ dom }: { dom?: Element }): Promise<void>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 추가 ssoFlow 진행
     * @param dom
     * @param ssoFlow
     * @param syncToken
     * @param eventListener
     * @private
     */
    openSsoFlow({
        dom,
        ssoFlow,
        syncToken,
        eventListener,
    }: {
        dom?: Element
        ssoFlow: string
        syncToken: string
        eventListener?: EdkEventListener
    }): Promise<EdkIframeComponent | undefined>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 데이터싱크 오픈
     */
    openDevtool({ dom, eventListener }: { dom?: Element; eventListener?: EdkEventListener }): Promise<EdkIframeComponent>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 데이터싱크 오픈
     */
    openDataSync({
        dom,
        orgSyncId,
        eventListener,
    }: {
        orgSyncId: string
        dom?: Element
        eventListener?: EdkEventListener
    }): Promise<EdkIframeComponent>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 인사이트 오픈
     */
    openInsightLoca({
        dom,
        orgSyncId,
        eventListener,
    }: {
        dom?: Element
        orgSyncId: string
        eventListener?: EdkEventListener
    }): Promise<EdkIframeComponent>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 인사이트 오픈
     */
    openInsight({
        dom,
        orgAlias,
        clientAlias,
        eventListener,
    }: {
        dom?: Element
        orgAlias: string
        clientAlias?: string
        eventListener?: EdkEventListener
    }): Promise<EdkIframeComponent>
    /**
     * !!!!주의!!!! 외부에 공개되는 함수, 변경시 공유 필요
     * 인사이트 오픈
     */
    openInsightReport({
        dom,
        orgAlias,
        clientAlias,
        eventListener,
    }: {
        dom?: Element
        orgAlias: string
        clientAlias?: string
        eventListener?: EdkEventListener
    }): Promise<EdkIframeComponent>
    /**
     * Ifrmae
     * @param key
     * @param data
     * @private
     */
    private appendIframe
    /**
     * 로그
     * @param key
     * @param data
     * @private
     */
    logger(key: string, ...data: any[]): void
}
export {}
