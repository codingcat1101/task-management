export function getTimeOfDay() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    if (currentHour >= 5 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }

  export function isUndefined(value) {
    return value === undefined
  }

  export function isNull(value) {
    return value === null
  }

  export function isEmpty(value) {
    return value === ''
  }

  export function isArrayEmpty(list) {
    return list.length === 0
  }

  export const getTaskId = () => {
    let randomNum = Math.floor(Math.random() * 99999) - 100
    var milliseconds = new Date().getTime();
    var taskId = "TASK" + "-" + milliseconds + "-" + randomNum;
    return taskId;
}