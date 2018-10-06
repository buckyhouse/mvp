const Mongo = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const path = require('path')
const IPFS = require('ipfs')
const keys = require('./secrets/secrets.js').keys
const cp = require('child_process')
const MongoUrl = keys.MongoUrl
let db = {}

// It's just an empty object with those fields to avoid error messages when initializing
let ipfs = {
    files: {
        add: function() {}
    }
}

start()

async function start() {
    const database = await Mongo.connect(MongoUrl, { useNewUrlParser: true })
    db = database.db()
    await startIpfs()

    pinningInterval()
    setInterval(() => {
        pinningInterval()
    }, 43200e3)
}

function startIpfs() {
    return new Promise(resolve => {
        ipfs = new IPFS({
            start: true,
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            config: {
                Addresses: {
                    Swarm: [
                        "/ip4/0.0.0.0/tcp/4002",
                        "/ip4/127.0.0.1/tcp/4003/ws",
                        "/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star",
                        '/p2p-circuit/ipfs/QmVeEwahbrrVwrUuTsVwPekcpY2xHKJFgVYyZji3quycbX'
                    ],
                    API: '/ip4/127.0.0.1/tcp/5002',
                    Gateway: '/ip4/127.0.0.1/tcp/9090',
                },
                Discovery: {
                    MDNS: {
                        Enabled: true,
                        Interval: 10
                    },
                    webRTCStar: {
                        Enabled: true
                    }
                },
                Bootstrap: [
                    '/ip4/1.215.232.107/tcp/4001/ipfs/QmZSPPHZgpNznyGRedNLX3ZzU2iKK15BCyBhSopAQkJNjT',
                    '/ip4/100.15.70.197/tcp/34716/ipfs/QmPhGRK15J3tT1R8qJ9cbEkrAgAVmwFG6AnmbtQEJoRo9s',
                    '/ip4/103.205.97.78/tcp/4001/ipfs/QmXPbFGQDLeatcWEJr6f3XEoiLcX6uoZqujYk44GM6t629',
                    '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                    '/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx',
                    '/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
                    '/ip4/104.248.70.88/tcp/4001/ipfs/QmamxGp6sw2dKUHm2RnaJ7zRDeR3w8m98kKAYgfpszeqHR',
                    '/ip4/106.12.20.117/tcp/4001/ipfs/QmWYvhpJ5tpCw1GJWQadbe9JUwzeoWytyvBFhjLdW57wq9',
                    '/ip4/108.35.33.23/tcp/58891/ipfs/QmWQt5taPtzudCL8tNWsA13d9GMc1WggvL3kPFsD81zv5n',
                    '/ip4/109.237.27.159/tcp/4001/ipfs/QmSfTjCpMLs9yo3C9HqRmja6oJxanESqVVN4AE46aZPxPq',
                    '/ip4/118.27.39.39/tcp/4001/ipfs/QmXbYfWjkbhdgoK7zSabTYF9ZGMB3AByEjShedJh3aGN6F',
                    '/ip4/119.205.234.49/tcp/4001/ipfs/QmU5SJBeNTUWGqNmgCFF4G1sZZf5cZiKb9LGrJg7yCcEqg',
                    '/ip4/120.132.114.16/tcp/4001/ipfs/QmZEj826oDsdGCFKS7wE5iXeZBh8VBq4TsUEuJAqFc1mqK',
                    '/ip4/128.199.200.41/tcp/4001/ipfs/QmTt8KxYeMdjWg2wMHSgctuHE5uHgd8Un7dd52esK75v28',
                    '/ip4/13.250.47.115/tcp/4001/ipfs/QmZ6U7jLiQho5uccVLQppR5TQiRB3CSbB9hTMq7kM6c7Gt',
                    '/ip4/13.57.51.70/tcp/4001/ipfs/QmQ88tsHquF5reE7Bbe8PDpeXo1yzqbZBBKoqh9xV5V6ss',
                    '/ip4/13.58.143.99/tcp/4001/ipfs/QmaiS1JPwvkVDc53kiA6RC4RzjzPNdf9gwn73EXZTVPxAE',
                    '/ip4/130.180.25.252/tcp/35911/ipfs/Qmc1pgSVGe5ptWJazRpmqo6YfCV7EdEyFqPXX9pmqDFbpy',
                    '/ip4/137.116.150.86/tcp/4001/ipfs/QmdpuXkLac114RGkSXaHtdAuJgd7p2kmEG28ctrEn4tRAW',
                    '/ip4/137.82.3.103/tcp/4001/ipfs/QmP4jQJ9kfk7RjpLrUXEyoFAiEP6u9Jxa5S2crWrHqShPZ',
                    '/ip4/138.197.108.157/tcp/4001/ipfs/QmTMSgsyw3zzVbcQnkoN5SRZk7WYUMorJ7EqkqVBLgn13i',
                    '/ip4/138.197.138.242/tcp/4001/ipfs/QmbyhSAPfmRHzaqAMfk6ydNQwWWvjPfAMSiUfLDUtSCgWg',
                    '/ip4/138.201.67.218/tcp/4001/ipfs/QmbVWZQhCGrS7DhgLqWbgvdmKN7JueKCREVanfnVpgyq8x',
                    '/ip4/139.162.204.130/tcp/4001/ipfs/QmNUCfyL67rqBesyCLon9kRUpXtPEfVUzf7aGp1VXqGqW4',
                    '/ip4/139.180.219.55/tcp/4001/ipfs/QmXutC4ceu4i8So7BfBqtygMDiQixZnBNyxjaZczXBfWTR',
                    '/ip4/140.82.37.83/tcp/4001/ipfs/QmRhi4YCC2rx1GgATkgfSaYRtiMfb4SvJ3nfGAJaMsCEUz',
                    '/ip4/142.93.188.196/tcp/4001/ipfs/QmZBo6gmPEhnMxwRkozEf2hiyekifiJptWnmM7jGuSJnkE',
                    '/ip4/144.202.108.32/tcp/4001/ipfs/QmT1cwtvuKknEaaRRr1oz5Up81Y9fhNQnwtHJ4wa319Q3E',
                    '/ip4/144.202.48.171/tcp/33651/ipfs/QmZjMY3iCz9BTLVyeVo8C9h937xGBsMEDweQvx5hnhArsD',
                    '/ip4/144.202.48.171/tcp/35649/ipfs/QmQLYFPS99zipQnUbGgZkzgAw9CtdFeSsTgzv1RfGwR2Rq',
                    '/ip4/144.202.48.171/tcp/36777/ipfs/QmSiG8iWKtf39vNZR66S97QTJggXKBhZLCvauxY1x7ohZt',
                    '/ip4/144.202.48.171/tcp/37839/ipfs/QmdhG7gVRPAfu5bckeifW1vuXYAftdAmcDoeVuDzwxjdUM',
                    '/ip4/144.202.48.171/tcp/38377/ipfs/QmXtywJt9f7J4bEWPToBrM61DnEZadhE9wvRAsfZssSKyJ',
                    '/ip4/144.202.48.171/tcp/41531/ipfs/QmUD3qKeNcTmMM5a8C4THw5i8Sze9C4nV3J1xXMZxgYjQj',
                    '/ip4/144.202.48.171/tcp/42839/ipfs/QmVhBbszSSFA4R6i9KvYVezQoyBAgzKtHzAh1PeX92ieVF',
                    '/ip4/144.202.48.171/tcp/43035/ipfs/QmVH7oQs8LJpMSSABX6BkNAPAewrx4RXU1SjsjXVnDiT1k',
                    '/ip4/144.217.164.215/tcp/4001/ipfs/QmavoPm5ecVmcfBzZ6wUSJCQK6Dofe7bA5FhGcDoJoNYpR',
                    '/ip4/145.239.133.223/tcp/4001/ipfs/QmdheQbXzxefGdwrVSWwrHGNGc1cS7VpK5y9qaZ6yWTm6x',
                    '/ip4/147.135.130.181/tcp/4001/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
                    '/ip4/149.28.201.212/tcp/4001/ipfs/QmT7YB9fApt1L1HCidzDjWwRCkgqxQ5N5kQBk26LWLZc5W',
                    '/ip4/149.28.39.57/tcp/4001/ipfs/QmNj8nNysbUoKhhiG98UQji9mZretharWMZYkzwG416Ycn',
                    '/ip4/159.203.76.161/tcp/4001/ipfs/QmaZMX71BVaEAriTmTQXbG7sTj47yuqu2fjTuUMkjvjgHv',
                    '/ip4/159.69.94.9/tcp/4001/ipfs/QmXxfVLyXYtrviQ3KvtLPmz5Xy7ht9qvteUYvjW9Z9rubp',
                    '/ip4/163.172.148.142/tcp/4001/ipfs/QmaEPhisncP7U491SiEhh7vocgpn5CCx4gweMY1LiuqU8D',
                    '/ip4/163.172.165.6/tcp/4001/ipfs/QmTtAeYDifofpdUMCi7XUbYxUMi2N4kz2iT8nEDGvNuby3',
                    '/ip4/164.132.197.107/tcp/4001/ipfs/QmYumWXiiN1C5yuJ4bjQ71pvCDCEZ3ZHDKCBM1SsfdyrmA',
                    '/ip4/165.227.135.15/tcp/4001/ipfs/QmNaEYqfjYtJjneSjpmFd3U5UEYopeYTxTqqYtRUDRuV88',
                    '/ip4/165.227.15.228/tcp/4001/ipfs/QmNpkayLxAEvu62HRFcrAcMPTQxjg7D2rPpeqWMHm1igfs',
                    '/ip4/167.99.43.153/tcp/4005/ipfs/QmWRfXZCbmkdAFm3Nt2UG2nuMAgTNvvutARSAU6gsTLa6X',
                    '/ip4/167.99.43.153/tcp/4007/ipfs/Qmap77FubsnfteCcT2zfhrEHNdk7YBMnDnAz3ttj5KMT3h',
                    '/ip4/167.99.95.100/tcp/7000/ipfs/QmQcFqWjFypUeFY4dSuZYXK1XaL7FGC3MgS4WR4KQrUe91',
                    '/ip4/172.104.170.157/tcp/4001/ipfs/QmdKDhN46PbDzRd5KbS7wAQKE6ZuBya8yTEqcS3BsFGsHA',
                    '/ip4/173.249.29.150/tcp/4001/ipfs/QmXZ171yQPTk5pzyEKBT3VNhrWoTNsZdPYtP2ocH8dqjNa',
                    '/ip4/174.138.55.49/tcp/4001/ipfs/QmUrNX1v79na55PPkfqrKU32wznU6Vd2TSuWXdvcJEjDS1',
                    '/ip4/174.95.16.173/tcp/1901/ipfs/QmPEdbNfQ3Z1R6kayCwfND8X8XkJx2JGdix1nZCwzAT7F3',
                    '/ip4/178.128.115.58/tcp/4001/ipfs/QmcRr4tA8BEcMRZVQrj1wnFJqoqMaAfi5aWKeXBBYniVr8',
                    '/ip4/178.128.84.30/tcp/4001/ipfs/QmTddLQkGdk7dnJfT75TDdPHC91VBzbs5cK3r6yVtiy2yG',
                    '/ip4/178.62.106.30/tcp/4001/ipfs/QmUfQxnm88UGoNHhnZ6DHuqc4Gks8n7r8XW4R4bnbx9nFH',
                    '/ip4/18.185.92.140/tcp/4001/ipfs/QmQF5Y3WBq96RqwqZsre1bFaJVTdzVLTQYDqiMiQrDKZ8V',
                    '/ip4/18.204.212.146/tcp/4001/ipfs/QmaqchKgoPfq3SxaKHEejy5RhcS4bUXEiptz2iKW7o6Xfj',
                    '/ip4/18.216.42.195/tcp/4001/ipfs/QmdmE8sipSTaGHCDpuRH2aVN9wXwnBPLayxQnpzADQUEDf',
                    '/ip4/18.236.18.121/tcp/4001/ipfs/QmcVFr99hc7PL2pabsRqmCGWbVJTr6W9m5heM1iZ6zE8cT',
                    '/ip4/18.95.5.125/tcp/4001/ipfs/QmQnEDM8C1yGJrSxZcmpzoBtBrUW149RfY1DFH5qDBcJvY',
                    '/ip4/180.76.173.174/tcp/4001/ipfs/QmeqUV3S3FbVFz12ovay3DM1y8nZtNBJgN2Z55qVhHpST3',
                    '/ip4/185.21.217.44/tcp/4001/ipfs/QmVRSJWWAYtyGvcztKxQWt4MHDUWE1FT1FphCYgENXH16X',
                    '/ip4/185.227.110.224/tcp/4001/ipfs/QmPYqcehXZnZfX44xX3sfCoec14BAbYf6drdG3YH9gGKAJ',
                    '/ip4/192.99.6.117/tcp/4001/ipfs/QmQ85u4dH4EPRpNxLxBMvUCHCUyuyZgBZsfW81rzh51FtY',
                    '/ip4/195.242.117.71/tcp/4001/ipfs/QmSgKdrb5wRJDqCZ7BXQJ8bh1ECh52J5qE85Xt32jw9tRJ',
                    '/ip4/198.199.109.102/tcp/4001/ipfs/Qme1DN36KGCYhomRGw9D4N7b8dntneGQLF1qQuUAwq9trd',
                    '/ip4/198.27.223.213/tcp/26851/ipfs/QmaVjkXUH7nvEbC16Lkh4s7T4EN7gH1LBr4T1z2Yo2xtDw',
                    '/ip4/203.206.24.80/tcp/4001/ipfs/QmT8aQwQnXrmT4cnYpxvgpizJHtPdQQ57xgfjzB912Cmp6',
                    '/ip4/207.180.198.95/tcp/4001/ipfs/Qmawa5v5kuoCde8ZCTrEw72ZJthrRS9WMwGKQ61Tk5TzT4',
                    '/ip4/207.246.91.167/tcp/38161/ipfs/QmbauVf7VHNzy2qHgrCPU7XDrHSNM2XwX6U7heaUrAG3ZF',
                    '/ip4/207.246.91.167/tcp/40543/ipfs/QmdwEdXfT5Zoj7kXvw9Jh2rJdhyRSQxoJkbkh9i85vtbvS',
                    '/ip4/208.81.1.141/tcp/4001/ipfs/QmbSBzZ5tGGfDP5E7dT2MKDSH438XYY69S52pxrcQSwApt',
                    '/ip4/209.15.83.8/tcp/18201/ipfs/QmXhPUh4XZUX8SFh5y4516xynHCcgAjZSNiYZFXGpPdrqp',
                    '/ip4/209.97.178.189/tcp/4001/ipfs/QmZPowgiRSwyhyGqdngfnj5x481sotcB4WaHkNDqE3SFEK',
                    '/ip4/212.227.249.191/tcp/4001/ipfs/QmcZrBqWBYV3RGsPuhQX11QzpKAQ8SYfMYL1dGXuPmaDYF',
                    '/ip4/212.24.108.112/tcp/4001/ipfs/QmVkYLe8hxZW3qQSZmA3qC9hAXJSQP55ZQqXfqQQ3NpyAD',
                    '/ip4/213.122.125.84/tcp/59160/ipfs/Qmc3JxcCnESQMiyc2Gag81P6m82J4zmyYpdbc7Jo69JC3M',
                    '/ip4/216.116.134.15/tcp/4001/ipfs/QmbAwVZQriMPPZfAcWQfpK8AWEZ3Mg1BEaJhSNg6b6wDn1',
                    '/ip4/216.9.1.64/tcp/39171/ipfs/QmeWhFqYUW1LmhHQguG8Bfn79xust3hjwR1ZXrGr6Daydj',
                    '/ip4/217.182.195.23/tcp/4001/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
                    '/ip4/221.208.208.26/tcp/4001/ipfs/Qmeo9UQ7DcS2X3kJ5qNpTvKD5ybYwNQ3NsmqFg64CRoxtX',
                    '/ip4/27.201.136.6/tcp/52919/ipfs/QmTzqnnXS3EbwJRbjQ2fvetpBR4RhRMQGVSG1ZdCDoQhRJ',
                    '/ip4/34.211.225.35/tcp/4001/ipfs/QmWeKgpRhqBmeok1UhtWq2A3mCUdXstU8p7cVEFRGPwT62',
                    '/ip4/34.216.177.176/tcp/4001/ipfs/QmSNhQcBNUJzFwqyyV5jPS4L7ARALRm3fGXk6ofiwip6Vw',
                    '/ip4/34.241.17.180/tcp/4001/ipfs/QmfPZcnVAEjXABiA7StETRUKkS8FzNt968Z8HynbJR7oci',
                    '/ip4/34.244.201.235/tcp/4001/ipfs/QmWEdFDMCchvG1KdccTJo8BM4CUjqJ5m3uQLm6gUVvttGj',
                    '/ip4/35.168.104.254/tcp/4001/ipfs/Qmf9CgxpuQ14RwDoNpHp9ZcN7oy9VKA1ikvy3z3JyYqAKB',
                    '/ip4/35.174.9.235/tcp/4001/ipfs/Qmf6Wp6McAKm5oRYUPndLaAs5tnADASyJJZ3HkhzPmJJvY',
                    '/ip4/36.255.222.92/tcp/4001/ipfs/Qmbeombb6wEaUHuwu2xBawkqskXWT7eSCeUfvwgrWvqbQb',
                    '/ip4/37.139.27.238/tcp/51888/ipfs/QmZKrbCmJwWCbU5F72AGSuryVptFzZYrh6mE9x7d35x9e3',
                    '/ip4/37.252.127.12/tcp/4001/ipfs/QmQERvvN4qs1jbcevj9siG6RXZZAzyX3oK5bSq3UnH1umA',
                    '/ip4/37.59.47.56/tcp/4001/ipfs/QmWV8GSowUU8Gh8STY2W6TFMrdoH7rfRwXkrN8BTA8jtMF',
                    '/ip4/39.107.75.137/tcp/4001/ipfs/QmZEG2EtNxHXxdE1zkQB1hdvdep4u5dzsbhnifHpQtVUN2',
                    '/ip4/39.108.227.152/tcp/4001/ipfs/QmeiJZ3zdtKrx3W3D8EMADCPGQzFXRUzm2qAuHTQeobbb4',
                    '/ip4/40.91.215.195/tcp/4001/ipfs/QmZAWTQbCduZUf6ih99QfkQWSTx1A53RRiPGJV7ZYkYt4z',
                    '/ip4/45.32.133.104/tcp/4001/ipfs/QmaAbZQVFavUub1cvsXP8tfbk7p5i2cRVvimWv5La2E9U8',
                    '/ip4/45.32.133.110/tcp/4001/ipfs/Qmbv6oQtyfnyYnW7o2gTUubSvnggEh4o1BUY7gaAuriFw7',
                    '/ip4/45.32.166.181/tcp/33407/ipfs/QmU4H6HP4vzfsrMEqVV3GoKjoW9n9eq475uBYo45tDi43d',
                    '/ip4/45.32.166.181/tcp/33589/ipfs/Qmc6NzpG5dFUAn5dLh5Pm8LUhL64HUbbFQqEyK9j2Pfupm',
                    '/ip4/45.32.166.181/tcp/33595/ipfs/QmUw57MSGX6VQo8DNuBJcFPCSpWg1P5tSFNE8SkyGeF7iv',
                    '/ip4/45.32.166.181/tcp/35589/ipfs/QmeiwwfJYYHJAAqu557KF7WG21VHFMzagoqrdFGcYsTssV',
                    '/ip4/45.32.166.181/tcp/36799/ipfs/QmerakbmA17aoanrwj6JgxmoD2HrBVJQUeENNmSEEQm3uS',
                    '/ip4/45.32.166.181/tcp/43683/ipfs/QmaeEs9PdWnsGo8kP9oXZmveqvugbhPLJSWycCuHLCTQ4p',
                    '/ip4/45.32.166.181/tcp/44821/ipfs/QmRBLrR6EEzMQ6dqF9fdWsec7ZPdrYqDu9nBg6zwArZRG4',
                    '/ip4/45.32.166.181/tcp/45567/ipfs/QmSb1orXcnpuaU77jmwyeVaY22YJE7gcTXTkTsFCH76Ff2',
                    '/ip4/45.76.219.20/tcp/4001/ipfs/QmYxbY6jTo2BKtyV8kLERiWpH824hS1xCWkYeSZZBDwPqJ',
                    '/ip4/45.77.241.11/tcp/33851/ipfs/Qmdifz4DmhygaztJYYAbC3u5g4NkcM5RddHwfsaqpRudQs',
                    '/ip4/45.77.241.11/tcp/34175/ipfs/QmYRjaPGtYg8vkeJyPTZ2yZiHaJb4p3NC2qk5MrXrxEAj2',
                    '/ip4/45.77.241.11/tcp/36773/ipfs/QmU3DDaw6L91EbfYgjjXgXKy85CDdsZdw5cVZwNofvwniz',
                    '/ip4/45.77.241.11/tcp/39587/ipfs/QmX7mtoRmHw51SLDXExhnHQcHdJ31qA2Jh9PAhCGSP3QFT',
                    '/ip4/45.77.241.11/tcp/43763/ipfs/QmW1iLYuyno9zAKraybFgKQmdGk7KLK97ibZxY97RSsk7z',
                    '/ip4/45.77.241.11/tcp/45901/ipfs/QmPNKS2yB7J3ZYCeQbVj4BCAvXj4DakoWfyy39FyuKaZZh',
                    '/ip4/45.77.241.11/tcp/46601/ipfs/QmVTGxvpX9Yn1Ryaas7pnxjTSKNzMmbhBMJav5d8v5uUQF',
                    '/ip4/46.101.163.26/tcp/4001/ipfs/QmXVnAYiLDxPFZMSwqRELAC4SDxNFS85PNYxxzR9Y2sbpL',
                    '/ip4/46.101.251.211/tcp/4001/ipfs/QmbeQW3XukNzLd7NJGXe4ShnKrBHz3Qx3aCGqBSZ7EBKEA',
                    '/ip4/46.101.46.185/tcp/4001/ipfs/QmWe8k8yjy9Y3tEPT7cJBQb2drmL4Xf9hUFmZN7cA24ur9',
                    '/ip4/46.251.225.100/tcp/4001/ipfs/QmTZg4b7cvSmaab4BibwRfhKveBm74hBVhd9iaJ637ZD65',
                    '/ip4/47.100.196.220/tcp/4001/ipfs/QmQDoZkETcxg5q75kMEgR7L9kybZHe6Uw9hZbR6CnZvjQW',
                    '/ip4/47.158.137.45/tcp/30575/ipfs/QmdX5BzMJwCWtcsarWt64aU9gzzYbYJ9jaaoHwKrwBSFgp',
                    '/ip4/47.186.90.19/tcp/16462/ipfs/QmctjmzkBe6NsLdfUweKhRpz9SpGBuo9fuCa3oABMMxW2z',
                    '/ip4/47.88.154.219/tcp/4001/ipfs/QmS56S2ewhXHn3dxaowPiSeJb3bqJhureLsoMPvwn95VwT',
                    '/ip4/5.226.70.59/tcp/4001/ipfs/QmQZ8ndCuEowz6senUjeT52Gtj5Ke6ZCtZjK69M7nnvHo6',
                    '/ip4/5.9.59.34/tcp/4001/ipfs/QmRv1GNseNP1krEwHDjaQMeQVJy41879QcDwpJVhY8SWve',
                    '/ip4/51.15.176.17/tcp/4001/ipfs/QmVmzisKqGefU41L5t92SkswAtbNhpFF1UUi2U7mnKJBFb',
                    '/ip4/52.166.239.103/tcp/4001/ipfs/QmYM3v6mhnn1zMeiTq8KMmbzg4XhSRQHDhyYhTuE3e4poZ',
                    '/ip4/54.173.33.96/tcp/4001/ipfs/QmRSGx67Kq8w7xSBDia7hQfbfuvauMQGgxcwSWw976x4BS',
                    '/ip4/54.174.200.29/tcp/4001/ipfs/QmZbyvvvH1Cbsj73rECCcPdxntoJ4C6c1ftEDsYCzGoqZL',
                    '/ip4/54.214.209.239/tcp/4101/ipfs/QmdSyrLyk7wWK2mCKvcVPtU3ZNvHYGhWicsTFo3ZaZ4Ghu',
                    '/ip4/54.38.178.206/tcp/4001/ipfs/QmeJC1RpGJR4nf5PXt49pMzJnvGuoAhd53oxmr4M18vjnV',
                    '/ip4/58.32.32.16/tcp/42155/ipfs/QmP4dTctBeWFr7Wd7DPcjuTZ9uZppdJabo1yS4T5LvVivo',
                    '/ip4/58.87.77.106/tcp/4001/ipfs/QmTY8As23qRTH4cqaiNp5iGMPAcCU5G5n1pXZchy2Ckhny',
                    '/ip4/62.138.0.157/tcp/4001/ipfs/QmPzaaro1BA9fWkvVXt8epqRqCFwipuwm7LtYMK3b82goL',
                    '/ip4/62.138.0.236/tcp/4001/ipfs/Qmbowsfc92DtC6DKi4gRaVrQFVtG4WSMvv8GM6menkE1LS',
                    '/ip4/65.19.134.242/tcp/4001/ipfs/QmYCLRXcux9BrLSkv3SuGEW6iu7nUD7QSg3YVHcLZjS5AT',
                    '/ip4/66.109.211.167/tcp/4001/ipfs/QmeMFNuRLLn3fDu1fHCTL61rn94FoK3UAdsq61422239iB',
                    '/ip4/66.31.71.246/tcp/39952/ipfs/QmQoiz5uw3B8Z6jQERyvrDAu424sirFJEp2TLk53Hj3Xpt',
                    '/ip4/66.42.99.202/tcp/40103/ipfs/QmeQkPercdgDj6C81uA3cxQdfPxYrF5vaxnUwNSUe1Wvbv',
                    '/ip4/66.42.99.202/tcp/46181/ipfs/QmcW4YyBm9R9yCUBXcKsGCyrAw9ibGzWkZ9qxpfvz1Uyiu',
                    '/ip4/66.42.99.202/tcp/46369/ipfs/QmXfUhEXpkV4KTvC8SafX84daiVdEqcir4sKUNUaFM14Wx',
                    '/ip4/67.231.30.48/tcp/4001/ipfs/QmRbB7x2Acw474VJkHXDHhmeduUSRFsQkY8EQcpmN7xzoo',
                    '/ip4/69.197.160.138/tcp/51888/ipfs/QmY3c665BWmjtpjoDFX3iqhohX192tFjYQ3qidFXMMcr6x',
                    '/ip4/74.95.216.133/tcp/4001/ipfs/Qmdf6rEeqaWaN1Wzv3R12VUcbokn7RmCeXywZ6AS5P1DNW',
                    '/ip4/76.187.123.34/tcp/4001/ipfs/QmSfaBdZhui2YsVXrRMAvmRTBPoEoBANM2cRrzv3xX1EmS',
                    '/ip4/79.137.82.234/tcp/4001/ipfs/QmRjK77hETv2TfuG352aJSXyta7tvECFLeHBEwPK6YUiWX',
                    '/ip4/79.161.91.160/tcp/1116/ipfs/Qmcy3c9YGLFNrGfDBnMjVF1ktDMLE4AaMEDoxtTVYvMPY9',
                    '/ip4/85.184.254.188/tcp/4001/ipfs/QmXxD2paERR7SapyKCrWna2XvfiLauz7VxcRxDMCrFHnRp',
                    '/ip4/85.25.211.172/tcp/4001/ipfs/QmXWGPZq9F3Qg1RMf4ALrk7McLSYWff7Xgk3Go4pGnVYw5',
                    '/ip4/87.98.219.225/tcp/4001/ipfs/QmZPX4mQ9tx1mhUj3RZCkF3Pf986qZXpSfGYcJsvXavGg3',
                    '/ip4/88.133.168.58/tcp/4001/ipfs/QmUjJWdaD2Biy1XnmDDrHAJR2XPS3nxZvkSGi4fMsTS3MJ',
                    '/ip4/89.163.224.169/tcp/4001/ipfs/QmSJf6vLX1ZSPvxwCe34SPPwjP5zy8hEenCbnNfP7xZJnW',
                    '/ip4/91.121.221.228/tcp/4001/ipfs/QmeXAY4x7Jk7MLwy9se8tqfccj2q183njXbQFmzYnRyyeV',
                    '/ip4/95.179.139.23/tcp/39127/ipfs/QmTknQ4w6mGLCuYjYW99wnUSyzkK2AzkkCYSf8ScD7A9Yk',
                    '/ip4/95.179.139.23/tcp/40829/ipfs/QmcocgGxaUNMpHTES8N7ewjKjdc6Akt6MxoZmRn2F4BwtA',
                    '/ip4/95.179.139.23/tcp/42013/ipfs/QmPT4PKZgzbKftsDBjMh5DKMoxrkHtE7DY6G8kTdpKQZDZ',
                    '/ip4/95.179.139.23/tcp/44857/ipfs/QmcUWNUpFLYJ8rH8WD8MmeuP2JDkfpzFdJwJvXooDURy16',
                    '/ip4/95.211.193.89/tcp/4001/ipfs/QmSchpmJfceRqiPDkZPtcNkNzdEbKTA6BiZcPAQXwK3mNN',
                    '/ip4/96.231.213.147/tcp/58467/ipfs/QmbA3mfkWU9CqgtPw8Lure1LoUWCsHai22kCB7WqznLnaT'
                ],
                EXPERIMENTAL: {
                    pubsub: true
                }
            }
        })

        ipfs.on('ready', async () => {
            console.log('Ipfs is ready')
            console.log('Status is online?', ipfs.isOnline())

            await ipfs.swarm.peers()
            console.log('Swarmed peers')
            resolve()
        })
    })
}

function generateSnapshot(videoPathAndName, snapshotPathAndName) {
    return new Promise((resolve, reject) => {
        cp.exec(`ffmpeg -y -ss 00:00:05 -i "${videoPathAndName}" -vframes 1 "${snapshotPathAndName}"`, (err, stdout, stderr) => {
              // Could not generate snapshot
              if(err) return reject(err);
              return resolve();
        })
    })
}

// Publishes a file to the ipfs network and returns the hash address
function publishFileIpfs(file) {
    return new Promise(async (resolve, reject) => {
        const fileHashAddress = await ipfs.files.add(
            new ipfs.types.Buffer(file)
        )
        resolve(fileHashAddress)
    })
}

async function uploadFile(req, res) {
    let body = JSON.parse(req.body.stateObject)
    const file = req.files.file
    const snapshotFile = req.files.snapshotFile

    const ipfsHash = await publishFileIpfs(file.data)
    const snapshotIpfsHash = await publishFileIpfs(snapshotFile.data)
    const pinResult = await ipfs.pin.add(ipfsHash[0].hash)
    const pinResult2 = await ipfs.pin.add(snapshotIpfsHash[0].hash)
    console.log('published hash', ipfsHash[0].hash)
    console.log('published hash', snapshotIpfsHash[0].hash)
    body.ipfs = ipfsHash[0].hash
    body.snapshotIpfsFile = snapshotIpfsHash[0].hash
    body.date = Date.now()

    // If the file is a .mov or .mp4 generate a snapshot
    file.name = file.name.replace(' ', '-')
    snapshotFile.name = snapshotFile.name.replace(' ', '-')

    try {
        // Upload the file to IPFS and then add it to the ting
        if(file.name.substring(file.name.length - 2, file.name.length) != 'js') {
            await file.mv(path.join(__dirname, 'uploads', file.name))
        }

        // Upload the file to IPFS and then add it to the ting
        if(snapshotFile.name.substring(snapshotFile.name.length - 2, snapshotFile.name.length) != 'js') {
            await snapshotFile.mv(path.join(__dirname, 'uploads', snapshotFile.name))
        }

        await db.collection('ipfsFiles').insertOne(body)
    } catch(e) {
        return res.status(333).json({success: false, msg: 'There was an error uploading the file, try again', error: e})
    }
    console.log('sending correct response')
    return res.status(200).json({success: true})
}

// To pin all the files every 12 hours
async function pinningInterval() {
    console.log('Starting to pin')
    const hashes = await db.collection('ipfsFiles').find({
        ipfs: {
            $exists: true
        }
    }).project({ipfs: 1, _id: 0}).toArray()

    hashes.forEach(async hash => {
        const pinResult = await ipfs.pin.add(hash.ipfs)
        console.log('Pinned', hash.ipfs)
    })
}

// Returns the number of files specified with req.query.c
async function getFiles(req, res) {
    // Returns a json with each file's data
    const files = await db.collection('ipfsFiles').find({}, {
        limit: parseInt(req.query.c)
    }).sort({date: -1}).toArray()

    res.send(files)
}

async function deleteFile(req, res) {
    try {
        const response = await db.collection('ipfsFiles').findOneAndDelete({
            _id: ObjectID(req.query.id)
        })
    } catch(e) {
        return res.status(333).json({success: false, msg: 'There was an error deleting the file, try again', error: e})
    }
    console.log('sending correct response')
    return res.status(200).json({success: true})
}

async function editFile(req, res) {
    let body = JSON.parse(req.body.stateObject)
    const file = req.files.file
    const snapshotFile = req.files.snapshotFile
    let isEditingFiles = true

    if(!req.files) isEditingFiles = false

    // Upload a new file if that's the case
    if(isEditingFiles) {
        if(file) {
            const ipfsHash = await publishFileIpfs(file.data)
            const pinResult = await ipfs.pin.add(ipfsHash[0].hash)
            console.log('published hash', ipfsHash[0].hash)
            body.ipfs = ipfsHash[0].hash
            file.name = file.name.replace(' ', '-')
            body.date = Date.now()
        }

        if(snapshotFile) {
            const snapshotIpfsHash = await publishFileIpfs(snapshotFile.data)
            const pinResult2 = await ipfs.pin.add(snapshotIpfsHash[0].hash)
            console.log('published hash', snapshotIpfsHash[0].hash)
            body.snapshotIpfsFile = snapshotIpfsHash[0].hash
            snapshotFile.name = snapshotFile.name.replace(' ', '-')
            body.date = Date.now()
        }

        try {
            if(file) {
                // Upload the file to IPFS and then add it to the ting
                if(file.name.substring(file.name.length - 2, file.name.length) != 'js') {
                    await file.mv(path.join(__dirname, 'uploads', file.name))
                }
            }

            if(snapshotFile) {
                // Upload the file to IPFS and then add it to the ting
                if(snapshotFile.name.substring(snapshotFile.name.length - 2, snapshotFile.name.length) != 'js') {
                    await snapshotFile.mv(path.join(__dirname, 'uploads', snapshotFile.name))
                }
            }
        } catch (e) {
            return res.status(333).json({success: false, msg: '#1 There was an error editing the file, try again', error: e})
        }
    }

    // Then update the information in the database
    try {
        let updateChanges = {
            title: body.title,
            description: body.description,
            category: body.category,
            advertiserId: body.advertiserId,
            tags: body.tags,
            revenueModel: body.revenueModel,
            fixedPayment: body.fixedPayment,
            daysAvailable: body.daysAvailable
        }

        if(isEditingFiles) {
            if(file) {
                updateChanges.ipfs = body.ipfs
                updateChanges.fileName = body.fileName
            }

            if(snapshotFile) {
                updateChanges.snapshotIpfsFile = body.snapshotIpfsFile
                updateChanges.snapshotFileName = snapshotFile.name
            }
        }

        await db.collection('ipfsFiles').updateOne({
            _id: ObjectID(body._id)
        }, {
            $set: updateChanges
        })
    } catch (e) {
        return res.status(333).json({success: false, msg: '#2 There was an error updating the file, try again'})
    }

    console.log('sending correct response')
    return res.status(200).json({success: true})
}

async function findUser(wallet) {
    return await db.collection('users').findOne({ wallet })
}

async function getAccountType(req, res) {
    const user = await findUser(req.query.wallet)
    if(user == null) return res.send('register')
    else return res.send(user.accountType)
}

async function registerNew(req, res) {
    const body = req.body.data
    let userData
    try {
        userData = JSON.parse(req.body.data)
        await db.collection('users').insertOne(userData)
    } catch(e) {
        return res.status(333).json({success: false, msg: '#1 There was an error processing the user information, please try again'})
    }
    return res.status(200).json({success: true})
}

async function checkAccess(req, res) {
    const user = await findUser(req.query.wallet)

    if(user == null) return res.send({hasAccess: false})
    if(req.query['account-type'] == user.accountType) return res.send({hasAccess: true})
    return res.send({hasAccess: false})
}

module.exports = {
    uploadFile,
    getFiles,
    deleteFile,
    editFile,
    getAccountType,
    registerNew,
    checkAccess,
}
