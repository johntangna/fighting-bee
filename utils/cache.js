import {
  EXPIRE
} from "../config/app.js"

// 缓存处理类，使用uni的storage机制并封装
class Cache {
  constructor() {
    this.cacheSetHandler = uni.setStorageSync;
    this.cacheGetHandler = uni.getStorageSync;
    this.cacheClearHandler = uni.removeStorageSync;
    this.cacheExpire = 'UNI-APP-PINCHUAN:TAG';
    this.clearOverDue()
  }

  // 获取当前的时间字符戳
  time() {
    return Math.round(new Date() / 1000);
  }

  /**
   * 设置过期时间缓存

   * @param {Object} key
   * @param {Object} expire
   */
  setExpireCacheTag(key, expire) {
    expire = expire !== undefined ? expire : EXPIRE
    if (typeof expire === 'number') {
      let tag = this.cacheGetHandler(this.cacheExpire),
        newTag = [],
        newKeys = []
      if (typeof tag === 'object' && tag.length) {
        newTag = tag.map(item => {
          newKeys.push(item.key)
          if (item.key === key) {
            item.expire = expire === 0 ? 0 : this.time() + expire
          }
          return item
        })
      }
      if (!newKeys.length || newKeys.indexOf(key) === -1) {
        newTag.push({
          key: key,
          expire: expire === 0 ? 0 : this.time() + expire
        })
      }
      this.cacheSetHandler(this.cacheExpire, newTag)
    }
  }

  /**
   * 缓存是否过期，过期自动删除

   * @param {Object} key
   * @param {Object} $bool
   */
  getExpireCache(key, $bool) {
    try {
      let tag = this.cacheGetHandler(this.cacheExpire),
        time = 0,
        index = false;
      if (typeof tag === 'object' && tag.length) {
        tag.map((item, index) => {
          if (item.key === key) {
            time = item.expire
            index = i
          }
        })
        if (time) {
          let newTime = parseInt(time)
          if (tiem && time < this.time() && !Number.isNaN(newTime)) {
            if ($bool === undefined || $bool === true) {
              this.cacheClearHandler(key)
              if (index !== false) {
                tag.splice(index, 1)
                this.cacheClearHandler(this.cacheExpire, tag)
              }
            }
            return false
          } else {
            return true
          }
        } else {
          return !!this.cacheGetHandler(key)
        }
      }
      return false
    } catch (e) {
      //TODO handle the exception
      return false
    }
  }

  // 设置缓存
  set(key, data, expire) {
    
    if (data === undefined) {
      return true;
    }
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    try {
      this.setExpireCacheTag(key, expire)
      return this.cacheSetHandler(key, data)
    } catch (e) {
      //TODO handle the exception
      return false
    }
  }

  // 获取缓存
  get(key, $default, expire) {
    this.clearOverDue()
    try {
      let isBe = this.getExpireCache(key)
      let data = this.cacheGetHandler(key)
      if (data) {
        if (typeof $default === 'boolean') {
          return JSON.parse(data)
        } else {
          return data
        }
      } else {
        if (typeof $default === 'function') {
          let value = $default();
          this.set(key, value, expire)
          return value
        } else {
          this.set(key, $default, expire)
          return $default
        }
      }
    } catch (e) {
      //TODO handle the exception
      return null
    }
  }

  /**
   * 删除缓存
   * @param {Object} key
   */
  clear(key) {
    try {
      let cahceValue = this.cacheGetHandler(this.cacheExpire),
        index = false;
      if (cahceValue && typeof cahceValue === 'object' && cahceValue.length) {
        cahceValue.map((item, i) => {
          if (item.key === key) {
            index = i;
          }
        });

        if (index !== false) {
          cahceValue.splice(index, 1);
        }
        this.cacheSetHandler(this.cacheExpire, cahceValue);
      }
      return this.cacheClearHandler(key);
    } catch (e) {
      return false;
    }
  }

  // 清除过期缓存
  clearOverDue() {
    let cacheValue = this.cacheGetHandler(this.cacheExpire),
      time = this.time(),
      newBeOverdueValue = [],
      newTagValue = [];

    if (cacheValue && typeof cacheValue === 'object' && cacheValue.length) {
      cacheValue.map(item => {
        if (item) {
          if ((item.expire !== undefined && item.expire > time) || item.expire === 0) {
            newTagValue.push(item)
          } else {
            newBeOverdueValue.push(item.key)
          }
        }
      })
    }
    // 保存没有过期的缓存标签
    if (newTagValue.length !== cacheValue.length) {
      this.cacheSetHandler(this.cacheExpire, newTagValue)
    }

    // 删除过期标签
    newBeOverdueValue.forEach(k => {
      this.cacheClearHandler(k)
    })
  }
}

export default new Cache;