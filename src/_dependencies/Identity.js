import addScriptAsync from '../../../utilities/script-async'

export const attrToObject = (attributes = [], getAttributes = []) => {
  return getAttributes.reduce((prev, name) => {
    const attrs = attributes.find(attr => attr.name === name)

    if (attrs) {
      prev[name] = attrs.value
    }
    return prev
  }, {})
}

const AddIdentity = siteProperties => {
  const {
    signwall: { ORIGIN_IDENTITY_SDK, ORIGIN_API },
  } = siteProperties

  return addScriptAsync({
    name: 'sdkIndetityARC',
    url: ORIGIN_IDENTITY_SDK,
  }).then(added => {
    if (added) {
      window.Identity.apiOrigin = ORIGIN_API
    }
    return window.Identity
  })
}

const userProfile = (getAttr = []) => {
  const hasIdentity = Object.prototype.hasOwnProperty.call(window, 'Identity')
  let promiseProfile = null
  if (!hasIdentity) {
    throw new Error('not found Identity')
  }

  if (window.Identity.userProfile) {
    promiseProfile = Promise.resolve(window.Identity.userProfile)
  } else {
    promiseProfile = window.Identity.getUserProfile()
  }
  return promiseProfile.then(userPorfile => {
    const { attributes, contacts = [], ...restProfile } = userPorfile
    const [phone = {}] = contacts || []

    return Object.assign(
      {},
      restProfile,
      phone,
      attrToObject(attributes, getAttr)
    )
  })
}

export { AddIdentity, userProfile }
