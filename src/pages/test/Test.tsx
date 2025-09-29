import {
  Box,
  Button,
  Text,
  Stack,
  Spinner,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Global, css } from '@emotion/react';
import type { AxiosRequestConfig, RawAxiosResponseHeaders, AxiosResponseHeaders } from 'axios';
import api from '@/shared/api/axiosClient';

// API 요청 정보를 담을 타입
interface ApiRequestData {
  method?: string;
  url?: string;
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
  params?: Record<string, unknown> | URLSearchParams;
  withCredentials?: boolean;
  timeout?: number;
  data?: unknown;
}

// API 응답 정보를 담을 타입
interface ApiResponseData {
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  data: unknown;
}

// 요청과 응답을 모두 포함하는 전체 트랜잭션 타입
interface ApiTransaction {
  request: ApiRequestData;
  response: ApiResponseData | null; // 응답은 없을 수도 있으므로 | null
}

const highlightJSON = (obj: unknown): string => {
  try {
    const json = JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"\s*:)|"(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
        (match) => {
          if (/^".*"\s*:/.test(match)) {
            return `<span class="json-key">${match}</span>`;
          }
          if (/^".*"$/.test(match)) {
            return `<span class="json-string">${match}</span>`;
          }
          if (/true|false/.test(match)) {
            return `<span class="json-boolean">${match}</span>`;
          }
          if (/null/.test(match)) {
            return `<span class="json-null">${match}</span>`;
          }
          return `<span class="json-number">${match}</span>`;
        },
      );
    return json;
  } catch {
    return String(obj);
  }
};

function Test() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('/');
  const [transaction, setTransaction] = useState<ApiTransaction | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [errorRaw, setErrorRaw] = useState<unknown>(null);
  const [authToken, setAuthToken] = useState<string>(''); // 수동 Authorization 입력(우선 적용)
  const [requestMethod, setRequestMethod] = useState<string>('GET');
  const [configText, setConfigText] = useState<string>(
    JSON.stringify(
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        // withCredentials: false,
        // timeout: 10000,
        // params: { }
      },
      null,
      2,
    ),
  );
  const [requestBodyText, setRequestBodyText] = useState<string>('');

  const testApiConnection = async () => {
    setIsLoading(true);
    setTransaction(null);
    setErrorText(null);
    setErrorRaw(null);

    // 사용자 config 파싱
    let parsedConfig: AxiosRequestConfig = {};
    try {
      if (configText && configText.trim().length > 0) {
        parsedConfig = JSON.parse(configText);
      }
    } catch (e: unknown) {
      setIsLoading(false);
      setTransaction(null);
      const errorMessage = e instanceof Error ? e.message : String(e);
      const errorName = e instanceof Error ? e.name : 'Unknown Error';
      setErrorText(`Config JSON 파싱 실패: ${errorMessage}`);
      setErrorRaw({ name: errorName, message: errorMessage });
      return;
    }

    // 수동 Authorization 입력이 있으면 우선 적용 (없으면 인터셉터가 Basic 자동 주입)
    if (authToken.trim()) {
      parsedConfig.headers = {
        ...(parsedConfig.headers as Record<string, unknown> | undefined),
        Authorization: authToken.trim(),
      };
    }

    const methodUpper = (requestMethod || 'GET').toUpperCase();
    const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(methodUpper);
    let requestData: unknown = undefined;
    if (hasBody && requestBodyText && requestBodyText.trim().length > 0) {
      try {
        requestData = JSON.parse(requestBodyText);
      } catch {
        requestData = requestBodyText;
      }
    }

    const finalConfig: AxiosRequestConfig = {
      ...parsedConfig,
      method: methodUpper,
      url: apiUrl,
      data: requestData,
    };

    try {
      const axiosResponse = await api.request(finalConfig);

      const requestDump = {
        method: axiosResponse.config.method?.toUpperCase(),
        url: axiosResponse.config.url,
        headers: axiosResponse.config.headers,
        params: axiosResponse.config.params,
        withCredentials: axiosResponse.config.withCredentials,
        timeout: axiosResponse.config.timeout,
        data: hasBody ? requestData : undefined,
      } as const;

      setTransaction({
        request: requestDump,
        response: {
          status: axiosResponse.status,
          statusText: axiosResponse.statusText,
          headers: axiosResponse.headers,
          data: axiosResponse.data,
        },
      });
      setErrorText(null);
      setErrorRaw(null);
    } catch (err: unknown) {
      console.error('API 요청 에러:', err);
      if (isAxiosError(err)) {
        const hasResponse = !!err.response;
        const hasRequest = !!err.request;
        if (hasResponse) {
          const requestDump = {
            method: err.config?.method?.toUpperCase(),
            url: err.config?.url || apiUrl,
            headers: err.config?.headers,
            params: err.config?.params,
            withCredentials: err.config?.withCredentials,
            timeout: err.config?.timeout,
            data: hasBody ? requestData : undefined,
          } as const;
          setTransaction({
            request: requestDump,
            response: {
              status: err.response!.status,
              statusText: err.response!.statusText,
              headers: err.response!.headers,
              data: err.response!.data,
            },
          });
          setErrorText(null);
          setErrorRaw({
            name: err.name,
            message: err.message,
            code: err.code,
            config: err.config
              ? { method: err.config.method, url: err.config.url, headers: err.config.headers }
              : undefined,
            response: err.response
              ? {
                  status: err.response.status,
                  statusText: err.response.statusText,
                  headers: err.response.headers,
                  data: err.response.data,
                }
              : undefined,
          });
        } else if (hasRequest) {
          setTransaction({
            request: {
              method: methodUpper,
              url: apiUrl,
              headers: parsedConfig?.headers,
              params: parsedConfig?.params,
              withCredentials: parsedConfig?.withCredentials,
              timeout: parsedConfig?.timeout,
              data: hasBody ? requestData : undefined,
            },
            response: null,
          });
          setErrorText(
            [
              '응답은 수신되지 않았습니다. (브라우저 CORS 정책으로 응답 접근이 차단된 것으로 보입니다)',
              `code: ${err.code || 'ERR_NETWORK'}`,
              `message: ${err.message || ''}`,
              `조치: 프론트는 hosts 파일을 확인하고, http://local.pull.it.kr:5173으로 접속했는지 확인. \n 서버는 Access-Control-Allow-Origin: ${window.location.origin} (필요 시 Access-Control-Allow-Credentials: true) 설정 및 OPTIONS/해당 경로 모두에 동일 정책 적용 여부 확인`,
            ].join('\n'),
          );
          setErrorRaw({ name: err.name, message: err.message, code: err.code });
        } else {
          setTransaction({
            request: {
              method: methodUpper,
              url: apiUrl,
              headers: parsedConfig?.headers,
              params: parsedConfig?.params,
              withCredentials: parsedConfig?.withCredentials,
              timeout: parsedConfig?.timeout,
              data: hasBody ? requestData : undefined,
            },
            response: null,
          });
          setErrorText('알 수 없는 Axios 에러가 발생했습니다.');
          setErrorRaw({ name: err.name, message: err.message, code: err.code });
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : String(err);
        const errorName = err instanceof Error ? err.name : 'Unknown Error';
        setTransaction({
          request: {
            method: methodUpper,
            url: apiUrl,
            headers: parsedConfig?.headers,
            params: parsedConfig?.params,
            withCredentials: parsedConfig?.withCredentials,
            timeout: parsedConfig?.timeout,
            data: hasBody ? requestData : undefined,
          },
          response: null,
        });
        setErrorText(`응답은 수신되지 않았습니다.\n요청 설정 에러: ${errorMessage}`);
        setErrorRaw({ name: errorName, message: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const methodUpper = (requestMethod || 'GET').toUpperCase();
  const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(methodUpper);

  return (
    <>
      <Global
        styles={css`
          .json-key {
            color: #1e40af;
            font-weight: 600;
          }
          .json-string {
            color: rgb(255, 0, 0);
          }
          .json-number {
            color: #b45309;
          }
          .json-boolean {
            color: #be123c;
            font-weight: 600;
          }
          .json-null {
            color: #6b7280;
            font-style: italic;
          }
        `}
      />
      <Stack spacing={6} p={6} align="center">
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="2xl" color="teal.600" fontWeight="bold">
            CORS API 연결 테스트
          </Text>
        </Box>

        {/* 메서드 + URL */}
        <InputGroup size="md">
          <InputLeftAddon width="140px">
            <Select
              value={requestMethod}
              onChange={(e) => setRequestMethod(e.target.value)}
              border="none"
              _focus={{ boxShadow: 'none' }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
              <option value="HEAD">HEAD</option>
              <option value="OPTIONS">OPTIONS</option>
            </Select>
          </InputLeftAddon>
          <Input
            placeholder="/ (상대 경로)"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && apiUrl.trim()) {
                testApiConnection();
              }
            }}
            fontFamily="mono"
          />
        </InputGroup>

        {/* 로컬 환경용 Basic Auth 로그인 (인터셉터 자동 첨부) */}
        {import.meta.env.DEV && (
          <Box
            w="100%"
            p={4}
            bg="gray.50"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontWeight="bold" mb={2}>
              로컬 개발자 안내
            </Text>
            <Text fontSize="sm" color="gray.700" sx={{ whiteSpace: 'pre-line' }}>
              로컬에서는 URL을 <b>상대경로(/)</b>로 호출하세요. Vite dev proxy가{' '}
              <b>env(.env.local)</b>에 설정된 Basic Auth를 서버로 전달합니다.
              {'\n'}VITE_API_BASE_URL=https://qa.api.pull.it.kr{'\n'}VITE_BASIC_USER=아이디{'\n'}
              VITE_BASIC_PASS=비밀번호 이런식으로 설정하세요.
            </Text>
            <Text fontSize="sm" color="gray.700" mt={2}>
              수동 Authorization 입력란에 값을 넣으면 그 값이 우선 적용됩니다. 비워두면 프록시가
              설정한 값을 사용합니다.
            </Text>
            <Text fontSize="sm" color="gray.700" mt={2}>
              사용 가능한 api{'\n'}
              GET / POST /echo1 POST /echo2
            </Text>
          </Box>
        )}

        {/* 수동 Authorization 입력 (옵션) */}
        <InputGroup size="md">
          <InputLeftAddon width="140px">Authorization</InputLeftAddon>
          <Input
            placeholder="Bearer ey... 또는 Basic base64(id:pw)"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            fontFamily="mono"
          />
        </InputGroup>

        <VStack w="100%" spacing={4} align="stretch">
          <Box>
            <Text mb={2} fontWeight="semibold">
              Axios Config (JSON)
            </Text>
            <Textarea
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              placeholder="Enter axios config JSON here..."
              fontFamily="mono"
              rows={8}
            />
          </Box>

          {hasBody && (
            <Box>
              <Text mb={2} fontWeight="semibold">
                Request Body (JSON or Text)
              </Text>
              <Textarea
                value={requestBodyText}
                onChange={(e) => setRequestBodyText(e.target.value)}
                placeholder="Enter request body (JSON or plain text) here..."
                fontFamily="mono"
                rows={5}
              />
            </Box>
          )}
        </VStack>

        <Button
          w="100%"
          colorScheme="teal"
          onClick={testApiConnection}
          isLoading={isLoading}
          loadingText="연결 중..."
          isDisabled={!apiUrl.trim()}
        >
          API 연결 테스트
        </Button>

        {/* 전체 트랜잭션 JSON (Request + Response) */}
        {!!transaction && (
          <Box
            w="100%"
            p={5}
            bg="gray.50"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
          >
            <Text fontWeight="bold" color="gray.700" mb={2}>
              전체 요청/응답 (JSON)
            </Text>
            <Box fontFamily="mono" fontSize="md" bg="white" p={3} borderRadius="md">
              <Box
                as="pre"
                color="gray.800"
                fontSize="md"
                lineHeight="1.6"
                className="json-root"
                dangerouslySetInnerHTML={{ __html: highlightJSON(transaction) }}
              />
            </Box>
          </Box>
        )}

        {/* API 요청/응답 결과 (원하는 경우 섹션별로도 확인) */}
        {!!transaction && (
          <>
            {/* 전체 요청 */}
            <Box
              w="100%"
              p={4}
              bg="blue.50"
              borderRadius="md"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontWeight="bold" color="blue.700" mb={2}>
                전체 요청
              </Text>
              <Box fontFamily="mono" fontSize="md" bg="white" p={3} borderRadius="md">
                <Box
                  as="pre"
                  color="gray.800"
                  fontSize="md"
                  lineHeight="1.6"
                  className="json-root"
                  dangerouslySetInnerHTML={{ __html: highlightJSON(transaction.request) }}
                />
              </Box>
            </Box>

            {/* 전체 응답 */}
            <Box
              w="100%"
              p={4}
              bg="green.50"
              borderRadius="md"
              border="1px solid"
              borderColor="green.200"
            >
              <Text fontWeight="bold" color="green.700" mb={2}>
                전체 응답
              </Text>
              <Box fontFamily="mono" fontSize="md" bg="white" p={3} borderRadius="md">
                <Box
                  as="pre"
                  color="gray.800"
                  fontSize="md"
                  lineHeight="1.6"
                  className="json-root"
                  dangerouslySetInnerHTML={{
                    __html: highlightJSON(transaction.response ?? '(응답 수신 안됨)'),
                  }}
                />
              </Box>
            </Box>
          </>
        )}

        {/* 응답을 받지 못한 경우, 별도 설명 텍스트 */}
        {errorText && (
          <Box
            w="100%"
            p={4}
            bg="orange.50"
            borderRadius="md"
            border="1px solid"
            borderColor="orange.200"
          >
            <Text fontWeight="bold" color="orange.700" mb={2}>
              응답은 수신되지 않았습니다
            </Text>
            <Box fontFamily="mono" fontSize="sm" bg="white" p={3} borderRadius="md">
              <Text whiteSpace="pre-wrap" color="gray.800">
                {errorText}
              </Text>
            </Box>
          </Box>
        )}

        {/* Axios 에러 원본(요청자가 원본 확인 원할 때) */}
        {!!errorRaw && (
          <Box
            w="100%"
            p={4}
            bg="red.50"
            borderRadius="md"
            border="1px solid"
            borderColor="red.200"
          >
            <Text fontWeight="bold" color="red.700" mb={2}>
              에러 원본 (Axios Error dump)
            </Text>
            <Box fontFamily="mono" fontSize="sm" bg="white" p={3} borderRadius="md">
              <Box
                as="pre"
                color="gray.800"
                fontSize="sm"
                lineHeight="1.6"
                className="json-root"
                dangerouslySetInnerHTML={{ __html: highlightJSON(errorRaw) }}
              />
            </Box>
          </Box>
        )}

        {isLoading && (
          <Box textAlign="center">
            <Spinner size="lg" color="teal.500" />
            <Text mt={2}>API 서버에 연결하는 중...</Text>
          </Box>
        )}
      </Stack>
    </>
  );
}

export default Test;
