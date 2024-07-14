export const searchFilterLogic = (props:any) => {
    const { searchInput, listOfData, keys, dropdownValue, dropdownKey } = props;
    const regex = /^[a-zA-Z0-9\s.-]+$/;
    if (!regex.test(searchInput)) {
      return [];
    }
  
    return listOfData?.filter((item:any) =>
      keys.some((key:any, index:number) => {
        const nestedKeys = key.split('.'); // Split nested key by dot
        let value = item;
        for (const nestedKey of nestedKeys) {
            value = value?.[nestedKey];
            if (value === undefined) {
                return false; // Stop iteration if nested key not found
            }
        }
        const result = (value?.toString().toLowerCase().includes(searchInput.toLowerCase()) && 
        (!dropdownValue ||item?.[dropdownKey]?.some((category:any) => category?.id == dropdownValue)))
        return result;
    }) 
    );
  }

  export const buildFormData = (formData:FormData, data:any, parentKey:string) => {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach(key => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;
  
      formData.append(parentKey, value);
    }
  };