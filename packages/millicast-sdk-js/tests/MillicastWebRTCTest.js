
const millicast = window.millicast

class MillicastWebRTCTest {
  constructor () {
    this.token =
      '5159e188181e7fea4b21bd4af7a04e1c634af11995d421431a2472c134b59f31'
    this.streamName = 'kmc1vt0c'
    this.streamAccountId = 'tnJhvK'
    this.millicastWebRTC = new millicast.MillicastWebRTC()
    this.millicastSignaling = new millicast.MillicastSignaling()
    this.millicastMedia = window.millicastMedia
  }

  async testGetRTCPeer () {
    const response = await this.millicastWebRTC.getRTCPeer()
    console.log('getRTCPeer response: ', response)
    return response
  }

  async testCloseRTCPeer () {
    await this.millicastWebRTC.getRTCPeer()
    await this.millicastWebRTC.closeRTCPeer()
    console.log('closeRTCPeer response: ', this.millicastWebRTC.peer)
    return this.millicastWebRTC.peer
  }

  async testGetRTCConfiguration () {
    try {
      const response = await this.millicastWebRTC.getRTCConfiguration()
      console.log('getRTCConfiguration response: ', response)
      return response
    } catch (error) {
      console.log('getRTCConfiguration response: ', error)
      return error
    }
  }

  async testGetRTCIceServers () {
    try {
      const response = await this.millicastWebRTC.getRTCIceServers()
      console.log('getRTCIceServers response: ', response)
      return response
    } catch (error) {
      console.log('getRTCIceServers response: ', error)
      return error
    }
  }

  async testSetRTCRemoteSDP () {
    const mediaStream = await this.millicastMedia.getMedia()
    const director = await millicast.MillicastDirector.getPublisher(this.token, this.streamName)
    const config = await this.millicastWebRTC.getRTCConfiguration()
    await this.millicastWebRTC.getRTCPeer(config)
    const localsdp = await this.millicastWebRTC.getRTCLocalSDP(true, mediaStream)
    this.millicastSignaling.wsUrl = `${director.wsUrl}?token=${director.jwt}`
    const remotesdp = await this.millicastSignaling.publish(localsdp)

    const response = await this.millicastWebRTC.setRTCRemoteSDP(remotesdp)
    console.log('setRTCRemoteSDP result: ', this.millicastWebRTC.peer.remoteDescription)
    return response
  }

  async testGetRTCLocalSDP () {
    await this.millicastWebRTC.getRTCPeer()
    try {
      const response = await this.millicastWebRTC.getRTCLocalSDP(true, null)
      console.log('getRTCLocalSDP response: ', response)
      return response
    } catch (error) {
      console.log('getRTCLocalSDP response: ', error)
      return error
    }
  }

  async testResolveLocalSDP () {
    const config = await this.millicastWebRTC.getRTCConfiguration()
    await this.millicastWebRTC.getRTCPeer(config)
    const response = await this.millicastWebRTC.getRTCLocalSDP(false, null)
    console.log('resolveLocalSDP response: ', response)
    return response
  }

  async testUpdateBandwidthRestriction () {
    const config = await this.millicastWebRTC.getRTCConfiguration()
    await this.millicastWebRTC.getRTCPeer(config)
    const localsdp = await this.millicastWebRTC.getRTCLocalSDP(true, null)
    const response = this.millicastWebRTC.updateBandwidthRestriction(localsdp, 500)
    console.log('updateBandwidhRestriction response: ', response)
    console.log('oldsdp == newsdp? ', localsdp === response)
    return response
  }

  async testUpdateBitrate () {
    const response = await this.millicastWebRTC.updateBitrate(500)
    console.log('updateBitrate response: ', response)
    return response
  }

  testGetRTCPeerStatus () {
    const response = this.millicastWebRTC.getRTCPeerStatus()
    console.log('getRTCPeerStatus response: ', response)
    return response
  }
}

window.millicastWebRTCTest = new MillicastWebRTCTest()