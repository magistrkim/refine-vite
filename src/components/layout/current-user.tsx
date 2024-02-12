import { Button, Popover } from "antd"

const CurrentUser = () => {
  return (
    <>
        <Popover
            placement="bottomRight"
            trigger="click"
            overlayInnerStyle={{padding: 0}}
            overlayStyle={{zIndex: 999}}
    >
        Click 
        {/* <Button></Button> */}
        </Popover>
    </>
  )
}

export default CurrentUser