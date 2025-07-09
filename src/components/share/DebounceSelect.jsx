import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

export const DebounceSelect = ({
  fetchOptions,
  debounceTimeout = 800,
  value,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
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
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const handleFocus = () => {
    if (options.length === 0) {
      fetchOptions("").then((newOptions) => {
        setOptions(newOptions);
      });
    }
  };

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      value={value}
      options={options}
      onFocus={handleFocus}
    />
  );
};
