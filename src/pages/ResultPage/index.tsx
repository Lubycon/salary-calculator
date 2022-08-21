import { css } from '@emotion/css';
import { useBooleanState, useQueryParam } from '@lubycon/react';
import { RollingNumber } from '@lubycon/rolling-number';
import LoadingSpinner from 'components/LoadingSpinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'open-color';
import { Flex, Spacing, Stack, Txt } from 'quantumic-design';
import { useEffect, useMemo, useState } from 'react';
import { commaizeNumber } from 'temen';
import { getMonthlySalary } from 'utils/salary';

const ResultPage = () => {
  const router = useRouter();
  const 세전연봉 = useQueryParam('salary', Number);
  const 실수령액 = useMemo(() => getMonthlySalary(세전연봉 ?? 0), [세전연봉]);
  const [loading, , endLoading] = useBooleanState(true);
  const [loadingMessage, setLoadingMessage] = useState('소득세를 계산 중이에요...');

  useEffect(() => {
    const timeout = setTimeout(() => {
      endLoading();
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setLoadingMessage('4대 보험료를 계산 중이에요...');
    }, 1500);
    const timeout2 = setTimeout(() => {
      setLoadingMessage('거의 다 끝났어요...');
    }, 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  if (세전연봉 == null || loading === true) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        className={css`
          height: 100vh;
        `}
      >
        <LoadingSpinner color={colors.white} size={24} />
        <Spacing size={16} />
        <Txt color={colors.white}>{loadingMessage}</Txt>
      </Flex>
    );
  }

  return (
    <Flex
      justify="center"
      align="center"
      className={css`
        height: 100vh;
      `}
    >
      <Flex direction="column">
        <Flex direction="column">
          <Txt color={colors.gray[6]} size={18} lineHeight="21.48px" weight={500}>
            연봉 {commaizeNumber(세전연봉)}원 기준으로
          </Txt>
          <Spacing size={20} />
          <Flex align="center">
            <Txt
              size={64}
              color={colors.white}
              lineHeight="76.38px"
              weight={700}
              className={css`
                margin-right: 8px;
              `}
            >
              매달
            </Txt>
            <RollingNumber
              width={38}
              height={64}
              number={실수령액}
              formatter={value => (
                <Txt size={64} lineHeight="76.38px" weight={700} color={colors.indigo[6]}>
                  {value}
                </Txt>
              )}
            />
            <Txt size={64} color={colors.white} lineHeight="76.38px" weight={700}>
              원을 받아요
            </Txt>
          </Flex>
        </Flex>
        <Spacing size={48} />
        <Stack gutter={16} align="center">
          <Txt color={colors.white} size={24} weight={700} lineHeight="40px">
            내가 받는 연봉은
          </Txt>
          <button />
          <Txt color={colors.white} size={24} weight={700} lineHeight="40px">
            중에서 몇위일까?
          </Txt>
        </Stack>
        <Spacing size={80} />
        <Flex
          className={css`
            width: 100%;
          `}
        >
          <button
            className={css`
              width: 163px;
              height: 80px;
              border: 2px solid ${colors.indigo[7]};
              border-radius: 20px;
              background-color: transparent;
              color: ${colors.indigo[7]};
              font-size: 24px;
              line-height: 32px;
              cursor: pointer;
              transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
              &:hover {
                opacity: 0.8;
              }
              &:active {
                transform: scale(0.95);
              }
            `}
            onClick={() => router.push('/')}
          >
            다시하기
          </button>
        </Flex>
      </Flex>
      <div
        className={css`
          position: absolute;
          bottom: 0;
          right: 15vw;
        `}
      >
        <Image layout="fixed" width={306} height={306} src="/cash.png" />
      </div>
    </Flex>
  );
};

export default ResultPage;
