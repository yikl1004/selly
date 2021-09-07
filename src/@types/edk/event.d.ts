import { EdkHostSessionInfo } from './host-session'
interface EdkBasicEvent {
    id: string
    clientId: string
    message: string
}
/**
 * 준비 완료
 */
interface EdkClientReadyEvent extends EdkBasicEvent {
    type: 'client'
    action: 'ready'
}
/**
 * 연결 요청
 */
interface EdkHostHandShakeEvent extends EdkBasicEvent {
    type: 'host'
    action: 'handshake'
    data: {
        session: EdkHostSessionInfo | null
    }
}
/**
 * 연결 응답
 */
interface EdkClientHandShakeEvent extends EdkBasicEvent {
    type: 'client'
    action: 'handshake'
    data: {
        isSessionUpdate: boolean
    }
}
/**
 * 클라이언트 닫기
 */
interface EdkClientCloseEvent extends EdkBasicEvent {
    type: 'client'
    action: 'close'
}
/**
 * 클라이언트 에러 발생
 */
interface EdkClientErrorEvent extends EdkBasicEvent {
    type: 'client'
    action: 'error'
    error: Error
}
/**
 * 요청 이벤트 client -> host
 */
export declare type EdkHostEvent = EdkHostHandShakeEvent | EdkClientErrorEvent
/**
 * 응답 이벤트 host -> client
 */
export declare type EdkClientEvent = EdkClientReadyEvent | EdkClientErrorEvent | EdkClientHandShakeEvent | EdkClientCloseEvent
/**
 * 전체 이벤트
 */
export declare type EdkEvent = EdkClientEvent | EdkHostEvent

declare global {
    export declare type EdkEventListener = (event: EdkEvent) => void
}

export {}
