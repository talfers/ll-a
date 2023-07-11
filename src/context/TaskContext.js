import createDataContext from './createDataContext';
import tabs from '../data/tabs';
import config from '../config';

const taskReducer = (state, action) => {
  switch(action.type) {
    case 'update_value':
      const updateState = {...state}
      updateState.tabs[action.payload.tab].inputs[action.payload.section][action.payload.name].value = action.payload.value
      return updateState;
    case 'post_response':
      const postState = {...state}
      postState.tabs[action.payload.tabId].response = action.payload.response
      return postState;
    case 'increment_step':
      if (state.tabs[action.payload.tabId].step >= Object.keys(state.tabs[action.payload.tabId].inputs).length - 1){
        return state
      } else {
        const incrementState = {...state}
        incrementState.tabs[action.payload.tabId].step = action.payload.step
        return incrementState;
      }
    case 'decrement_step':
      if (state.tabs[action.payload.tabId].step <= 0){
        return state
      } else {
        const decrementState = { ...state }
        decrementState.tabs[action.payload.tabId].step = action.payload.step
        return decrementState;
      }
    case 'reset_step':
      if (state.tabs[action.payload.tabId].step <= 0){
        return state
      } else {
        const resetStepState = { ...state }
        resetStepState.tabs[action.payload.tabId].step = action.payload.step
        return resetStepState;
      }
    case 'reset_response':
        const resetState = {...state}
        resetState.tabs[action.payload.tabId].response = ""
        resetState.tabs[action.payload.tabId].step = action.payload.step
        return resetState;
    case 'update_loading':
      const updateLoadingState = {...state}
      updateLoadingState.tabs[action.payload.tabId].loading = action.payload.value
      return updateLoadingState;
    case 'reset_state':
      return { tabs: [...tabs]}
    default:
      return state;
  }
}

const updateLoading = (dispatch) => {
  return (tabId, value) => {
    dispatch({ type: 'update_loading', payload: { tabId, value } })
  }
}


const postTaskData = (dispatch) => {
  return async (tab) => {
    try {
      const response = await fetch(config.REACT_APP_POST_TASK_DATA_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/event-stream',
            tab: JSON.stringify(tab),
          },
        }
      )
      // Read the response as a stream of data
      const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Massage and parse the chunk of data
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n\n");
            
            for (const line of lines) {
              // Update the UI with the new content
              if(line==='') dispatch({type: 'post_response', payload: {response: tab.response += '\n', tabId: tab.id}}) //currentPrompt: message,
              else dispatch({type: 'post_response', payload: {response: tab.response += line, tabId: tab.id}}) //currentPrompt: message,   
            }
        }
    } catch (error) {
      console.log(`Error posting tab. Error: ${error.message}`);
    }
  }
}


const updateValue = (dispatch) => {
  return (value, tab, section, name) => {
    dispatch({ type: 'update_value', payload: {tab, section, name, value }})
  }
}

const incrementStep = (dispatch) => {
  return (tabId, step) => {
    let newStep = step + 1
    dispatch({ type: 'increment_step', payload: { tabId, step: newStep } })
  }
}

const decrementStep = (dispatch) => {
  return (tabId, step) => {
    let newStep = step - 1
    dispatch({ type: 'decrement_step', payload: { tabId, step: newStep } })
  }
}

const resetStep = (dispatch) => {
  return (tabId) => {
    dispatch({ type: 'reset_step', payload: { tabId, step: 0 } })
  }
}

const resetResponse = (dispatch) => {
  return (tabId) => {
    dispatch({ type: 'reset_response', payload: { tabId, step: 0} })
  }
}

const resetState = (dispatch) => {
  return () => {
    dispatch({ type: 'reset_state' })
  }
}


export const { Provider, Context } = createDataContext(
  taskReducer,
  { postTaskData, updateValue, updateLoading, incrementStep, decrementStep, resetResponse, resetState, resetStep },
  {tabs: [...tabs]}
)