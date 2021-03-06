
export default function rejectDuplicates(userList, input) {
  if(userList.length === 0) return true;
  const nameKey = Object.keys(userList[0]).find(key => key.includes('Name'));
  const lowerNames = userList.map(item => item[nameKey].toLowerCase());
  if(lowerNames.includes(input.toLowerCase())) {
    window.alert('You have already used that name, choose another!');
    return false;
  }
  return true;

}
