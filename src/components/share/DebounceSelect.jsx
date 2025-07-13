import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

export const DebounceSelect = ({
  fetchOptions,
  debounceTimeout = 800,
  value,
  onChange,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return;
        setOptions(newOptions);
        setFetching(false);
        setOpen(true);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const handleChange = (newValue) => {
    setOpen(false); 
    onChange?.(newValue); 
  };

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={(val) => {
        if (val) {
          debounceFetcher(val);
        } else {
          setOpen(false);
        }
      }}
      onFocus={() => setOpen(false)}
      open={open}
      onChange={handleChange} 
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      value={value}
      {...props}
    />
  );
};
