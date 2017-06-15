run="curl https://www.google.com/search\?ei\=mZ1CWb-EDcOz-AGX-I6QBQ\&yv\=2\&q\=#\&vet\=10ahUKEwj_tIzKi8DUAhXDGT4KHRe8A1IQuT0IOSgB.mZ1CWb-EDcOz-AGX-I6QBQ.i\&ved\=0ahUKEwj_tIzKi8DUAhXDGT4KHRe8A1IQuT0IOSgB\&ijn\=1\&start\=0\&asearch\=ichunk\&async\=_id:rg_s,_pms:s"
echo $1
run=${run/\#/$1}
echo "" > curl.sh
echo $run > curl.sh
