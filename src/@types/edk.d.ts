declare global {
    interface Window {
        $edkHost: EmentalEDK['Host']
        edk: EmentalEDK
    }

    /**
     * @interface EmentalSDK
     * @description "/"
     */
    interface EmentalEDK {
        Container: Function
        Host: Function
    }

    export interface EdkSessionInfo {
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

    interface EdkBasicEvent {
        id: string
        clientId: string
        message: string
    }
    /**
     * 준비 응답
     */
    interface EdkResponseReadyEvent extends EdkBasicEvent {
        type: 'response'
        action: 'ready'
    }
    /**
     * 연결 요청 요청
     */
    interface EdkRequestHandShakeEvent extends EdkBasicEvent {
        type: 'request'
        action: 'handshake'
    }
    /**
     * 연결 응답
     */
    interface EdkResponseHandShakeEvent extends EdkBasicEvent {
        type: 'response'
        action: 'handshake'
    }
    /**
     * 로그인 요청
     */
    interface EdkRequestSigninEvent extends EdkBasicEvent {
        type: 'request'
        action: 'signin'
        data: {
            accessToken: string
        }
    }
    /**
     * 로그인 응답
     */
    interface EdkResponseSigninEvent extends EdkBasicEvent {
        type: 'response'
        action: 'signin'
    }
    /**
     * 로그인 요청
     */
    interface EdkRequestSsoEvent extends EdkBasicEvent {
        type: 'request'
        action: 'sso'
        data: {
            ssoFlow: string
            syncToken: string
        }
    }
    /**
     * 로그인 응답
     */
    interface EdkResponseSsoEvent extends EdkBasicEvent {
        type: 'response'
        action: 'sso'
        data: {
            accessToken: string
            refreshToken: string
        }
    }
    /**
     * Resolve 토큰 획득 이벤트
     */
    interface EdkResolveTokenEvent extends EdkBasicEvent {
        type: 'resolve'
        action: 'token'
        data: {
            session: EdkSessionInfo
        }
    }
    /**
     * Reject 에러 이벤트
     */
    interface EdkRejectErrorEvent extends EdkBasicEvent {
        type: 'reject'
        action: 'error'
        error: Error
    }
    /**
     * 요청 이벤트
     */
    export declare type EdkRequestEvent = EdkRequestHandShakeEvent | EdkRequestSsoEvent | EdkRequestSigninEvent
    /**
     * 응답 이벤트
     */
    export declare type EdkResponseEvent = EdkResponseReadyEvent | EdkResponseSsoEvent | EdkResponseSigninEvent | EdkResponseHandShakeEvent
    export declare type EdkResolveEvent = EdkResolveTokenEvent
    export declare type EdkRejectEvent = EdkRejectErrorEvent
    /**
     * 전체 이벤트
     */
    export declare type EdkEvent = EdkResponseEvent | EdkRequestEvent | EdkResolveEvent | EdkRejectEvent
    export declare type EdkEventListener = (event: EdkEvent) => void
}
export {}
