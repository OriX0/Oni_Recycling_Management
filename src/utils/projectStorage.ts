/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import CustomerStorage from './customerStorage';

const projectStorage = new CustomerStorage();
// 默认缓存时长一个月
projectStorage.bootStrap({ mode: 'local', timeout: 60 * 60 * 24 * 30 });

export default projectStorage;
